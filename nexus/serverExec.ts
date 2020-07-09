import { ServerResponse } from 'http'
import { NextPageContext } from 'next'
import { DocumentNode } from 'graphql'
import { print } from 'graphql/language/printer'
import { hasDirectives, removeDirectivesFromDocument } from '@apollo/client/utilities'
import cookie from 'cookie'

function removeDirectives(
  query: DocumentNode,
  directives: string[] = ['client', 'export']
): string | undefined {
  if (hasDirectives(directives, query)) {
    let start, end, startToken, endToken, locationOffset
    const docClone = removeDirectivesFromDocument(
      directives.map((o) => ({ name: o, remove: true })),
      query
    ) || {
      kind: 'Document',
      definitions: [],
      loc: { source: { body: '', locationOffset, name: '' }, start, end, startToken, endToken },
    }
    return print(docClone)
  }

  return query.loc?.source.body
}
interface IServerExecInput {
  queryDocument?: DocumentNode
  rawQuery?: string
  variables: any
}
export default async function serverExec(
  input: IServerExecInput,
  context: NextPageContext,
  stripDirectives?: string[]
) {
  if (process.env.NODE_ENV === 'development') require('nexus').default.reset()
  let query = ''
  if (input.queryDocument) {
    query = removeDirectives(input.queryDocument, stripDirectives) || ''
  } else if (input.rawQuery) {
    query = input.rawQuery
  }
  //   const MockRes = require('mock-res').default
  const app = require('nexus').default
  require('./graphql')

  app.assemble()
  const req: any = {
    method: 'POST',
    headers: context?.req?.headers,
    body: {
      query,
      variables: input.variables || {},
    },
  }
  // const res = new MockRes()
  const res = new ServerResponse({ ...req })
  const cookies = cookie.parse(context.req?.headers?.cookie || '')
  req.cookies = cookies
  req.res = res
  const response = await app.server.handlers.graphql(req, res)
  // const result = res._getJSON()

  const result = JSON.parse(
    Buffer.concat(
      // @ts-ignore
      res.outputData
        .filter(({ data }) => {
          return data instanceof Buffer
        })
        .map(({ data }) => data)
    ).toString()
  )
  return result.data
}
