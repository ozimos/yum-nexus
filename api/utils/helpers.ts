import { sign, verify, JsonWebTokenError } from 'jsonwebtoken'
import { TOKEN_PASSWORD, REFRESH_TOKEN_SECRET, tokens } from './constants'
import errors from './errors'
import { Response } from 'express'

export interface TokenPayload {
  id: string
  role: string
  type: string
  tokenVersion: string
  timestamp: number
}

export class NoTokenError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NoTokenError'
  }
}

export interface CustomContext {
  res: Response
  cookies
  tokenPayload?: TokenPayload
  tokenError?: JsonWebTokenError | NoTokenError
}

export const handleError = (error) => {
  // add any other logging mechanism here e.g. Sentry
  throw error
}
interface CreateTokenInput {
  id: string
  role: string
  tokenVersion: string
}

interface TokenType {
  name: string
  expiry: string
}

export const generateToken = (
  { id, role, tokenVersion }: CreateTokenInput,
  tokenType: TokenType,
  password: string,
) =>
  sign(
    {
      id,
      role,
      tokenVersion,
      type: tokenType.name,
      timestamp: Date.now(),
    },
    password,
    {
      expiresIn: tokenType.expiry,
    },
  )

export const generateAccessToken = (user: CreateTokenInput) =>
  generateToken(user, tokens.access, TOKEN_PASSWORD)

export const generateRefreshToken = (user: CreateTokenInput) =>
  generateToken(user, tokens.refresh, REFRESH_TOKEN_SECRET)

export function authGuard(context) {
  const { tokenPayload, tokenError } = context
  if (tokenPayload?.id && tokenPayload?.type === tokens.access.name) {
    return tokenPayload
  }
  const error = tokenError ? errors.invalidToken : errors.notAuthenticated
  handleError(error)
}

export function extractTokenPayload(req) {
  const { res, cookies } = req
  const bearerHeader = req.get('Authorization')
  const result = { cookies, res }
  if (typeof bearerHeader === 'undefined') {
    Object.assign(result, {
      tokenError: new NoTokenError('token not available'),
    })
    return result
  }
  const token = bearerHeader.split(' ').pop()

  try {
    const tokenPayload = verify(token, TOKEN_PASSWORD)
    if (!(tokenPayload as TokenPayload)) {
      throw errors.invalidToken
    }
    Object.assign(result, { tokenPayload })
  } catch (tokenError) {
    Object.assign(result, { tokenError })
  } finally {
    return result
  }
}
export function sendRefreshToken(res: Response, user: CreateTokenInput) {
  let token = ''
  if (user && (user as CreateTokenInput)) {
    token = generateRefreshToken(user)
  }
  return res.cookie('jid', token, { httpOnly: true })
}
