import { NextPageContext } from 'next'
import { ApolloLink, Operation, FetchResult, Observable, HttpLink, NextLink, gql } from '@apollo/client'
import { ClientRequest, ServerResponse } from 'http'
import { removeDirectivesFromDocument } from '@apollo/client/utilities'
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
     * The client side directives to remove from the graphql query.
     */
    directivesConfig: string[]

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
  public directivesConfig: string[] = []
  public removedCache = new Map()

  constructor({ handler, req, res, directivesConfig }: NexusHandler.Options) {
    super()

    this.handler = handler
    this.directivesConfig = directivesConfig
    this.req = req
    this.res = res
  }

  public removeDirectives(query: DocumentNode): string | undefined {
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
    const cleanedQuery = print(docClone)
    this.removedCache.set(query, cleanedQuery)
    return cleanedQuery
  }
  public request({ query: originalQuery, variables }: Operation): Observable<FetchResult> | null {
    const query = this.removeDirectives(originalQuery) || ''
    this.req.body = { query, variables }
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

export default function createIsomorphLink(context: Partial<NextPageContext> | undefined) {
  if (isServer() && context) {
    const req: any = {
      method: 'POST',
      headers: context?.req?.headers,
    }
    // const res = new MockRes()
    const res = new ServerResponse({ ...req })
    const cookies = cookie.parse(context.req?.headers?.cookie || '')

    req.cookies = cookies
    req.res = res
    const directivesConfig = ['client', 'export']
    const handler = require('../nexus/serverlessHandler')
    return new NexusHandlerLink({ req, res, handler, directivesConfig })
  } else {
    return new HttpLink({
      uri: isServer() ? getServerURL(graphPath) : getClientURL(graphPath),
      credentials: 'same-origin',
    })
  }
}
