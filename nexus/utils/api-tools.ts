import Cors from 'cors'
import { whitelist } from './constants'

export const cors = Cors()

// export const cors = Cors({
//   methods: ['GET', 'HEAD', 'OPTIONS','PUT', 'POST'],
//   origin: whitelist,
//   credentials: true,
// })

export function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
