import { NextApiRequest, NextApiResponse } from 'next'
import { cors, runMiddleware } from '../../nexus/utils/api-tools'
import serverlessHandler from '../../nexus/serverlessHandler'

interface CustomNextApiRequest extends NextApiRequest {
  res?: NextApiResponse
}
async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  
  // Run the middleware
  await runMiddleware(req, res, cors)
  req.res = res
  await serverlessHandler(req, res)
}

export default handler
