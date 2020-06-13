import { NextApiRequest, NextApiResponse } from 'next'
import { cors, runMiddleware } from '../../api/utils/api-tools'
if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

const app = require('nexus').default

require('../../api/graphql')

app.assemble()

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors)
  req.res = res
  await app.server.handlers.graphql(req, res)
}

export default handler
