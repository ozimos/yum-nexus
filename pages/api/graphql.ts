import Cors from 'cors'
import { whitelist } from '../../api/utils/constants'
if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

const app = require('nexus').default

require('../../api/graphql')

app.assemble()

const cors = Cors({
  methods: ['GET', 'HEAD'],
  origin: whitelist,
  credentials: true,
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)
  await app.server.handlers.graphql(req, res)
}

export default handler
