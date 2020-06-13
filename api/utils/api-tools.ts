import Cors from 'cors'
import { whitelist } from './constants'

export const cors = Cors({
  methods: ['GET', 'HEAD'],
  origin: whitelist,
  credentials: true,
})

export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
