import { sign, verify, JsonWebTokenError } from 'jsonwebtoken'
import { TOKEN_PASSWORD, tokens } from './constants'
import errors from './errors'

export interface TokenPayload {
  userId: string
  role: string
  type: string
  timestamp: number
}
export type TokenStatus =
  | { tokenPayload: TokenPayload }
  | { tokenError: JsonWebTokenError }

export const handleError = (error) => {
  // add any other logging mechanism here e.g. Sentry
  throw error
}
interface CreateTokenInput {
  id: string
  role: string
}
export const generateAccessToken = ({ id: userId, role }: CreateTokenInput) => {
  const accessToken = sign(
    {
      userId,
      role,
      type: tokens.access.name,
      timestamp: Date.now(),
    },
    TOKEN_PASSWORD,
    {
      expiresIn: tokens.access.expiry,
    },
  )
  return accessToken
}

export function authGuard(context) {
  const { tokenPayload, tokenError } = context
  if (tokenPayload?.userId && tokenPayload?.type === tokens.access.name) {
    return tokenPayload
  }
  const error = tokenError ? errors.invalidToken : errors.notAuthenticated
  handleError(error)
}

export const extractTokenPayload = (req) => {
  let result
  const bearerHeader = req.get('Authorization')
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ').pop()
    verify(token, process.env.TOKEN_PASSWORD, (tokenError, tokenPayload) => {
      if (tokenError) {
        result = { tokenError }
      }
      result = { tokenPayload }
    })
  }
  return result as TokenStatus
}
