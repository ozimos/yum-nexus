import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, from } from '@apollo/client'
// @ts-ignore
import { InStorageCache, PersistLink } from 'apollo-cache-instorage'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { NextPageContext } from 'next'
import cookie from 'cookie'
import JwtDecode from 'jwt-decode'
import { onError } from '@apollo/link-error'
import { setContext } from '@apollo/link-context'
import { getAccessToken, setAccessToken } from '../lib/accessToken'
import { resolvers } from './resolvers'
import typeDefs from './typeDefs'
import { CART_QUERY } from '../graphql/cart.query'

let apolloClient: ApolloClient<NormalizedCacheObject | InMemoryCache> | null = null
export const isServer = () => typeof window === 'undefined'
export const serverURL = process.env.NEXT_PUBLIC_YUM_SERVER_URL

export function fetchAccessToken() {
  return fetch(`${serverURL}/api/refresh_token`, {
    method: 'POST',
    credentials: 'include',
  })
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
}
function createApolloClient(serverAccessToken?: string): ApolloClient<NormalizedCacheObject | InMemoryCache> {
  const cache = new InMemoryCache({ typePolicies })
  const client = new ApolloClient({
    ssrMode: isServer(),
    link: from([
      new PersistLink(),
      createRefreshLink(),
      createAuthLink(serverAccessToken, `createApolloClient-${isServer() ? 'server' : 'client'}`),
      createErrorLink(),
      createHttpLink(),
    ]),
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
  serverAccessToken?: string
) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  if (!getAccessToken() && serverAccessToken) {
    setAccessToken(serverAccessToken)
  }
  return _apolloClient
}

export async function getServerAccessToken(context: NextPageContext) {
  let serverAccessToken = ''
  const cookies = cookie.parse(context.req?.headers?.cookie || '')
  if (cookies.jid) {
    const response = await fetch(`${serverURL}/api/refresh_token`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        cookie: 'jid=' + cookies.jid,
      },
    })
    const data = await response.json()
    serverAccessToken = data.accessToken
  }
  return serverAccessToken
}

export function useApollo(initialState: any, serverAccessToken?: string) {
  const store = useMemo(() => initializeApollo(initialState, serverAccessToken), [
    initialState,
    serverAccessToken,
  ])
  return store
}

function createHttpLink() {
  return new HttpLink({
    // uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn',
    uri: `${serverURL}/api/graphql`,
    credentials: 'same-origin',
    fetch,
  })
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
    fetchAccessToken,
    handleFetch: (accessToken) => {
      setAccessToken(accessToken)
    },
    handleError: (err) => {
      console.warn('Your refresh token is invalid. Try to relogin')
      console.error(err)
    },
  })
}

function createAuthLink(serverAccessToken?: string, label?: string) {
  return setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : '',
        label,
      },
    }
  })
}

function createErrorLink() {
  return onError(({ graphQLErrors, networkError, operation }) => {
    console.log(graphQLErrors)
    // console.log(networkError);
    // console.log('custom message', networkError?.result?.errors[0]);
    console.log(operation)
  })
}
