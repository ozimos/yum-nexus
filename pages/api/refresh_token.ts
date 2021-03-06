import { NextApiRequest } from 'next'
import { verify } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { cors, runMiddleware } from '../../nexus/utils/api-tools'
import { generateAccessToken, sendRefreshToken, TokenPayload } from '../../nexus/utils/helpers'
import { NoTokenError } from '../../nexus/utils/errors'
import { REFRESH_TOKEN_SECRET } from '../../nexus/utils/constants'

const prismaClient = new PrismaClient()

async function handler(req: NextApiRequest, res: any) {
  // Run the middleware
  await runMiddleware(req, res, cors)
  try {
    const token = req.cookies.jid
    if (!token) {
      throw new NoTokenError('token not available in cookie')
    }
    const tokenPayload = verify(token, REFRESH_TOKEN_SECRET || '')
    if (!(tokenPayload as TokenPayload)) {
      throw new Error('token is not refresh token')
    }
    const dbUser = await prismaClient.user.findOne({
      // @ts-ignore
      where: { id: tokenPayload.id },
    })
    // @ts-ignore
    if (!dbUser || dbUser.tokenVersion !== tokenPayload.tokenVersion) {
      throw new Error('token is invalid')
    }
    const { password, ...user } = dbUser
    sendRefreshToken(res, user)
    return res.json({
      // prettier-ignore
      "accessToken": generateAccessToken(user),
      user,
    })
  } catch (tokenError) {
    return res.send({ ok: false, accessToken: '' })
  }
}

export default handler
