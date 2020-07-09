import { NextPageContext } from 'next'
import { ApolloLink, Operation, FetchResult, Observable, HttpLink, NextLink, gql} from '@apollo/client'
import { ClientRequest, ServerResponse } from 'http'
import { hasDirectives, removeDirectivesFromDocument } from '@apollo/client/utilities'
import { print } from 'graphql/language/printer'
import { DocumentNode } from 'graphql'
// import MockRes from 'mock-res'
import cookie from 'cookie'
import { isServer, getServerURL, getClientURL, graphPath } from './common'

export namespace NexusHandler {
  export type NexusHandlerFunction = (req: ClientRequest, res: ServerResponse) => Record<string, any>

  export interface Options {
    /**
     * The nexus graphQL handler to generate responses from.
     */
    handler: any

    /**
     * A request object.
     */
    req?: ClientRequest

    /**
     * The response from the nexus handler.
     */
    res?: ServerResponse | Record<string, any>
  }
}

export class NexusHandlerLink extends ApolloLink {
  public handler: NexusHandler.NexusHandlerFunction | any
  public req: any
  public res: ServerResponse | any

  constructor({ handler, req, res }: NexusHandler.Options) {
    super()

    this.handler = handler
    this.req = req
    this.res = res
  }

  public request({ query, variables }: Operation): Observable<FetchResult> | null {
    this.req.body = { query: query?.loc?.source?.body, variables }
    return new Observable<FetchResult>((observer) => {
      Promise.resolve(this.handler(this.req, this.res))
        .then(() => {
          const result = JSON.parse(
            Buffer.concat(
              this.res.outputData
                .filter(({ data }) => {
                  return data instanceof Buffer
                })
                .map(({ data }) => data)
            ).toString()
          )
          // const result = this.res._getJSON()
          console.dir(result)
          if (!observer.closed) {
            observer.next(result)
            observer.complete()
          }
        })
        .catch((error) => {
          if (!observer.closed) {
            observer.error(error)
          }
        })
    })
  }
}

export class RemoveDirectiveLink extends ApolloLink {
  directivesConfig: string[] = []
  removedCache = new Map()

  constructor(directivesConfig: string[]) {
    super()
    this.directivesConfig = directivesConfig
  }

  removeDirectivesFromDocument(query: DocumentNode): DocumentNode {
    const cached = this.removedCache.get(query)
    if (cached) return cached
    let start, end, startToken, endToken, locationOffset
    const docClone = removeDirectivesFromDocument(
      this.directivesConfig.map((o) => ({ name: o, remove: true })),
      query
    ) || {
      kind: 'Document',
      definitions: [],
      loc: { source: { body: '', locationOffset, name: '' }, start, end, startToken, endToken },
    }
    const cleanedQuery = gql(print(docClone));
    this.removedCache.set(query, cleanedQuery)
    return cleanedQuery
  }

  public request(operation: Operation, forward: NextLink): Observable<FetchResult> | null {
    const { query } = operation

    if (hasDirectives(this.directivesConfig, query)) {
      operation.query = this.removeDirectivesFromDocument(query)
    }

    return forward ? forward(operation) : null
  }
}

export default function createIsomorphLink(context: Partial<NextPageContext> | undefined) {
  if (isServer() && context) {
    if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

    const app = require('nexus').default
    require('../nexus/graphql')

    app.assemble()

    const req: any = {
      method: 'POST',
      headers: context?.req?.headers,
    }
    // const res = new MockRes()
    const res = new ServerResponse({ ...req })
    const cookies = cookie.parse(context.req?.headers?.cookie || '')

    req.cookies = cookies
    req.res = res
    return new NexusHandlerLink({ req, res, handler: app.server.handlers.graphql })
  } else {
    return [
      new RemoveDirectiveLink(['client', 'export']),
      new HttpLink({
        uri: isServer() ? getServerURL(graphPath) : getClientURL(graphPath),
        credentials: 'same-origin',
      }),
    ]
  }
}
