import cookie from 'cookie'
import { sign, verify, JsonWebTokenError } from 'jsonwebtoken'
import { TOKEN_PASSWORD, REFRESH_TOKEN_SECRET, tokens, Role } from './constants'
import errors, { NoTokenError } from './errors'
import { Response } from 'express'

interface CreateTokenInput {
  id: string
  roles: Array<Role | keyof typeof Role>
  tokenVersion: string
}

export interface TokenPayload extends CreateTokenInput {
  type: string
  timestamp: number
}

export interface CustomContext {
  res: Response
  cookies: any
  tokenPayload?: TokenPayload
  tokenError?: JsonWebTokenError | NoTokenError
}

export const handleError = (error: Error | string) => {
  // add any other logging mechanism here e.g. Sentry
  throw error
}

interface TokenType {
  name: string
  expiry: string
}

export const generateToken = (
  { id, roles, tokenVersion }: CreateTokenInput,
  tokenType: TokenType,
  password: string
) =>
  sign(
    {
      id,
      roles,
      tokenVersion,
      type: tokenType.name,
      timestamp: Date.now(),
    },
    password,
    {
      expiresIn: tokenType.expiry,
    }
  )

export const generateAccessToken = (user: CreateTokenInput) =>
  generateToken(user, tokens.access, TOKEN_PASSWORD || '')

export const generateRefreshToken = (user: CreateTokenInput) =>
  generateToken(user, tokens.refresh, REFRESH_TOKEN_SECRET || '')

export function authGuard(context: any) {
  const { tokenPayload, tokenError } = context
  if (tokenPayload?.id && tokenPayload?.type === tokens.access.name) {
    return tokenPayload
  }
  const error = tokenError ? errors.invalidToken : errors.notAuthenticated
  handleError(error)
}

export function extractTokenPayload(req: any) {
  const { res, cookies } = req
  const bearerHeader = req.headers['authorization']
  const result = { cookies, res }
  if (typeof bearerHeader === 'undefined') {
    Object.assign(result, {
      tokenError: new NoTokenError('token not available'),
    })
    return result
  }
  const token = bearerHeader.split(' ').pop()
  try {
    const tokenPayload = verify(token, TOKEN_PASSWORD || '')
    if (!(tokenPayload as TokenPayload)) {
      throw errors.invalidToken
    }
    Object.assign(result, { tokenPayload })
    return result
  } catch (tokenError) {
    Object.assign(result, { tokenError })
    return result
  }
}
export function sendRefreshToken(res: Response, user: CreateTokenInput) {
  let token = ''
  if (user && (user as CreateTokenInput)) {
    token = generateRefreshToken(user)
  }
  return res.setHeader('set-cookie', cookie.serialize('jid', token, { httpOnly: true }))
}
