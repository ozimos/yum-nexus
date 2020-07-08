import { ServerResponse } from 'http'
import cookie from 'cookie'

export default async function serverExec(input, context) {
  if (process.env.NODE_ENV === 'development') require('nexus').default.reset()
  let query = ''
  if (input.queryDocument) {
    query = input.queryDocument.loc.source.body
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
