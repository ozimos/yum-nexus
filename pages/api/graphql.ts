import { NextApiRequest, NextApiResponse } from 'next'
import { cors, runMiddleware } from '../../nexus/utils/api-tools'

interface CustomNextApiRequest extends NextApiRequest {
  res?: NextApiResponse
}
async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  const serverlessHandler = require('../../nexus/serverlessHandler')
  
  // Run the middleware
  await runMiddleware(req, res, cors)
  req.res = res
  await serverlessHandler(req, res)
}

export default handler
