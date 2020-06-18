import { NextApiRequest, NextApiResponse } from 'next'
import { cors, runMiddleware } from '../../api/utils/api-tools'
if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

const app = require('nexus').default

require('../../api/graphql')

app.assemble()
interface CustomNextApiRequest extends NextApiRequest {
  res?: NextApiResponse
}
async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors)
  req.res = res
  await app.server.handlers.graphql(req, res)
}

export default handler
