import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, NormalizedCacheObject, from } from '@apollo/client'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { debuglog } from 'util'
import { NextPageContext } from 'next'
import cookie from 'cookie'
import JwtDecode from 'jwt-decode'
import { onError } from '@apollo/link-error'
import { setContext } from '@apollo/link-context'
import merge from 'lodash/merge'
import { getAccessToken, setAccessToken } from '../lib/accessToken'
import { resolvers } from './resolvers'
import typeDefs from './typeDefs'
import { CART_QUERY } from '../graphql/cart.query'
import createIsomorphLink from './serverLink'
import { isServer, getRemoteURL } from './common'

const log = debuglog('app')

let apolloClient: ApolloClient<NormalizedCacheObject | InMemoryCache> | null = null

const refreshTokenPath = '/api/refresh_token'

export async function fetchServerAccessToken(context: Partial<NextPageContext>) {
  const bearerToken = context?.req?.headers?.authorization?.split(' ')
  if (bearerToken?.[1]) {
    return bearerToken[1]
  }
  let serverAccessToken = ''
  const cookies = cookie.parse(context.req?.headers?.cookie || '')
  try {
    if (cookies.jid) {
      const response = await fetch(getRemoteURL(refreshTokenPath), {
        method: 'POST',
        headers: {
          cookie: `jid=${cookies.jid}`,
        },
        credentials: 'same-origin',
      })
      const data = await response.json()
      serverAccessToken = data.accessToken
    }
    if (serverAccessToken) {
      merge(context, { req: { headers: { authorization: `Bearer ${serverAccessToken}` } } })
    }
    return serverAccessToken
  } catch (error) {
    log(error)
    return serverAccessToken
  }
}
const typePolicies = {
  Cart: {
    fields: {
      meals: {
        merge(existing = [], incoming: any[]) {
          return incoming
        },
      },
    },
  },
  Query: {
    fields: {
      projectedMeals: {
        keyArgs: [],
      },
      moreProjectedMeals: {
        keyArgs: [],
      },
    },
  },
}

function createApolloClient(
  serverAccessToken = '',
  context?: Partial<NextPageContext> | undefined
): ApolloClient<NormalizedCacheObject | InMemoryCache> {
  const cache = new InMemoryCache({ typePolicies })
  const client = new ApolloClient({
    ssrMode: isServer(),
    // @ts-ignore
    link: from([
      createAuthLink(serverAccessToken),
      createRefreshLink(),
      createErrorLink(),
    ].concat(createIsomorphLink(context))),
    cache,
    resolvers,
    typeDefs,
  })
  function writeInitialData() {
    return cache.writeQuery({
      query: CART_QUERY,
      data: {
        cart: {
          id: 'myCart',
          meals: [],
          __typename: 'Cart',
        },
      },
    })
  }

  writeInitialData()
  // @ts-ignore
  client.onClearStore(writeInitialData)
  return client
}

export function initializeApollo(
  initialState: NormalizedCacheObject | InMemoryCache | null = null,
  serverAccessToken = '',
  context?: Partial<NextPageContext> | undefined
) {
  const _apolloClient = apolloClient ?? createApolloClient(serverAccessToken, context)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (isServer()) return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  if (!getAccessToken() && serverAccessToken) {
    setAccessToken(serverAccessToken)
  }
  return _apolloClient
}

export function useApollo(initialState: any, serverAccessToken = '') {
  const store = useMemo(() => initializeApollo(initialState, serverAccessToken), [
    initialState,
    serverAccessToken,
  ])
  return store
}

function createRefreshLink() {
  return new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
      const token = getAccessToken()
      if (!token) {
        return true
      }
      try {
        const { exp } = JwtDecode(token)
        if (Date.now() >= exp * 1000) {
          return false
        } else {
          return true
        }
      } catch {
        return false
      }
    },
    fetchAccessToken: () =>
      fetch(getRemoteURL(refreshTokenPath), {
        method: 'POST',
        credentials: 'same-origin',
      }),
    handleFetch: (accessToken) => {
      setAccessToken(accessToken)
    },
    handleError: (err) => {
      console.warn('Your refresh token is invalid. Try to relogin')
      console.error(err)
    },
  })
}

function createAuthLink(serverAccessToken = '') {
  return setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : '',
      },
    }
  })
}

function createErrorLink() {
  return onError(({ graphQLErrors, networkError, operation, response }) => {
    // console.dir(graphQLErrors)
    let errors
    try {
      errors = graphQLErrors
        ?.map((err) => JSON.parse(err?.message))
        ?.filter((message) => {
          return typeof message == 'object'
        })
    } catch {}
    if (errors) {
      delete response?.errors
      merge(response, { data: { errors } })
      merge(networkError, { statusCode: 400, response: { status: 400 } })
    }
    // console.log(networkError);
    // console.log('custom message', networkError?.result?.errors[0]);
    // console.log(operation)
  })
}
