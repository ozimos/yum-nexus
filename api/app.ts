// import { use, server } from 'nexus'
// import { prisma } from 'nexus-plugin-prisma'

// import passport from 'passport'
// import { Strategy as FacebookStrategy } from 'passport-facebook'
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
// import { config } from 'dotenv'
// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import { PrismaClient } from '@prisma/client'
// import {
//   generateAccessToken,
//   sendRefreshToken,
//   NoTokenError,
//   TokenPayload,
// } from './utils/helpers'

// const prismaClient = new PrismaClient()
// import {
//   facebookOptions,
//   facebookCallback,
//   googleOptions,
//   googleCallback,
//   tokenResponse,
//   googleFrontEndSignIn,
// } from './passport'
// import { verify } from 'jsonwebtoken'
// import { REFRESH_TOKEN_SECRET } from './utils/constants'
// config()
// const PORT = process.env.PORT || 4000
// // @ts-ignore
// server.express.options(cors())
// const whitelist = ['http://localhost:3000', 'https://localhost:3000']
// server.express.use(
//   cors({
//     origin: whitelist,
//     credentials: true,
//   }),
// )
// server.express.use(cookieParser())

// passport.use(new FacebookStrategy(facebookOptions(), facebookCallback))
// passport.use(new GoogleStrategy(googleOptions(), googleCallback))
// server.express.use(passport.initialize())

// server.express.get(
//   '/auth/facebook',
//   passport.authenticate('facebook', { scope: ['email'] }),
// )
// server.express.post('/refresh_token', async (req, res) => {
//   try {
//     const token = req.cookies.jid
//     if (!token) {
//       throw new NoTokenError('token not available in cookie')
//     }
//     const tokenPayload = verify(token, REFRESH_TOKEN_SECRET)
//     if (!(tokenPayload as TokenPayload)) {
//       throw new Error('token is not refresh token')
//     }
//     const dbUser = await prismaClient.user.findOne({
//       // @ts-ignore
//       where: { id: tokenPayload.id },
//     })
//     // @ts-ignore
//     if (!dbUser || dbUser.tokenVersion !== tokenPayload.tokenVersion) {
//       throw new Error('token is invalid')
//     }
//     const { password, ...user } = dbUser
//     sendRefreshToken(res, user)
//     return res.json({
//       // prettier-ignore
//       "accessToken": generateAccessToken(user),
//       user,
//     })
//   } catch (tokenError) {
//     return res.send({ ok: false, accessToken: '' })
//   }
// })

// server.express.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     session: false,
//   }),
//   tokenResponse,
// )

// server.express.get(
//   '/auth/google',
//   passport.authenticate('google', { scope: ['email', 'openid', 'profile'] }),
// )
// server.express.get(
//   '/auth/google/callback',
//   passport.authenticate('google', {
//     session: false,
//   }),
//   tokenResponse,
// )
// server.express.post('/auth/google/signin', googleFrontEndSignIn, tokenResponse)
// // Enables the Prisma plugin
// use(prisma())
