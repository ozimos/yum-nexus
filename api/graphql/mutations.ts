import { schema } from 'nexus'
import { hash, compare } from 'bcryptjs'
import errors from '../utils/errors'
import { OAuth2Client } from 'google-auth-library'
import { debuglog } from 'util'
import cuid from 'cuid'
import { generateAccessToken, sendRefreshToken, handleError } from '../utils/helpers'
import fetch from 'node-fetch'
import { PrismaClientKnownRequestError } from '@prisma/client'

const log = debuglog('app')
schema.mutationType({
  definition(t) {
    t.crud.createOneMeal()
    t.crud.createOneMenu()
    t.crud.createOneOrder()
    t.crud.createOneAddress()
    t.crud.createOneMeal({ alias: 'createOneOwnMeal' })
    t.crud.createOneMenu({ alias: 'createOneOwnMenu' })
    t.crud.createOneOrder({ alias: 'createOneOwnOrder' })
    t.crud.updateOneUser()
    t.crud.updateOneMeal()
    t.crud.updateOneMenu()
    t.crud.updateOneOrder()
    t.crud.updateOneAddress()
    t.crud.updateOneUser({ alias: 'updateOneOwnUser' })
    t.crud.updateOneMeal({ alias: 'updateOneOwnMeal' })
    t.crud.updateOneMenu({ alias: 'updateOneOwnMenu' })
    t.crud.updateOneOrder({ alias: 'updateOneOwnOrder' })
    t.crud.deleteOneUser()
    t.crud.deleteOneMeal()
    t.crud.deleteOneMenu()
    t.crud.deleteOneOrder()
    t.crud.deleteOneUser({ alias: 'deleteOneOwnUser' })
    t.crud.deleteOneMeal({ alias: 'deleteOneOwnMeal' })
    t.crud.deleteOneMenu({ alias: 'deleteOneOwnMenu' })
    t.crud.deleteOneOrder({ alias: 'deleteOneOwnOrder' })

    t.field('revokeUserRefreshToken', {
      type: 'User',
      args: {
        user: schema.arg({ type: 'UserWhereUniqueInput' }),
      },
      // @ts-ignore
      resolve: async (_parent, { user }, ctx) => {
        return await ctx.db.user.update({
          where: user,
          data: { tokenVersion: cuid() },
        })
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
      },
      resolve: async (_parent, { email, password: inputPassword }, ctx) => {
        let user = null
        try {
          user = await ctx.db.user.findOne({
            where: {
              email: email.toLowerCase(),
            },
          })
        } catch (e) {
          handleError(errors.invalidUser)
        }

        if (!user) handleError(errors.invalidUser)
        const { password, ...confirmedUser } = user
        if (!password) {
          throw new Error('No password set. Did you use social login?')
        }
        const passwordValid = await compare(inputPassword, password)
        if (!passwordValid) handleError(errors.invalidUser)

        const accessToken = generateAccessToken(confirmedUser)
        // @ts-ignore
        sendRefreshToken(ctx.res, confirmedUser)
        return {
          accessToken,
          user: confirmedUser,
        }
      },
    })

    t.field('signup', {
      type: 'AuthPayload',
      args: {
        firstName: schema.stringArg({ nullable: true }),
        lastName: schema.stringArg({ nullable: true }),
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
        roles: schema.arg({ type: 'Role', list: true }),
      },
      resolve: async (_parent, { firstName, lastName, email, roles, password: newPassword }, ctx) => {
        const hashedPassword = await hash(newPassword, 10)
        let user, password
        try {
          ;({ password, ...user } = await ctx.db.user.create({
            data: {
              firstName,
              lastName,
              email,
              roles: { set: roles },
              password: hashedPassword,
            },
          }))
        } catch (e) {
          if (e instanceof PrismaClientKnownRequestError) {
            handleError(errors.invalidUserEmail)
          }
          throw e
        }
        const accessToken = generateAccessToken(user)
        return {
          accessToken,
          user,
        }
      },
    })

    t.field('loginWithGoogle', {
      type: 'AuthPayload',
      args: {
        token: schema.stringArg({ required: true }),
      },
      // @ts-ignore
      resolve: async (_parent, { token }, { db, res }) => {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        let ticket
        try {
          ticket = await client.verifyIdToken({
            idToken: token,
            audience: [process.env.GOOGLE_CLIENT_ID || ''], // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
          })
        } catch (e) {
          log(e)
          throw e
        }
        const payload = ticket.getPayload()
        const { sub: googleId, email, family_name: lastName, given_name: firstName } = payload

        const profile = {
          googleId,
          email: email.toLowerCase(),
          firstName,
          lastName,
        }
        const existingUser = await db.user.findOne({ where: { googleId } })
        let user, password
        if (existingUser) {
          ;({ password, ...user } = existingUser)
        }
        return createAuthPayloadFromSocial(db, res, profile, user)
      },
    })

    t.field('loginWithFaceBook', {
      type: 'AuthPayload',
      args: {
        token: schema.stringArg({ required: true }),
      },
      // @ts-ignore
      resolve: async (_parent, { token }, { db, res }) => {
        let payload
        try {
          const response = await fetch(
            `/v7.0/me?fields=id,first_name,last_name,email,picture&access_token=${token}`
          )
          payload = response.json()
        } catch (e) {
          log(e)
          throw e
        }
        const { id: facebookId, email, last_name: lastName, first_name: firstName } = payload

        const profile = {
          facebookId,
          email: email.toLowerCase(),
          firstName,
          lastName,
        }
        const existingUser = await db.user.findOne({ where: { facebookId } })
        let user, password
        if (existingUser) {
          ;({ password, ...user } = existingUser)
        }
        return createAuthPayloadFromSocial(db, res, profile, user)
      },
    })
    t.field('logout', {
      type: 'LogoutResponse',
      args: {},
      // @ts-ignore
      resolve: async (_parent, _args, { res }) => {
        sendRefreshToken(res, null)
        return { accessToken: '', user: {} }
      },
    })
  },
})

async function createAuthPayloadFromSocial(db, res, profile, existingUser) {
  try {
    let user
    try {
      if (existingUser) {
        user = existingUser
      } else {
        user = await db.user.create({ data: profile })
      }
    } catch (e) {
      if (!e.message.includes('Unique constraint failed on the fields: (`email`)')) {
        log(e)
        throw e
      }
      const { id } = await db.user.findOne({
        where: { email: profile.email },
        select: { id: true },
      })
      user = await db.user.create({ data: { id, ...profile } })
    } finally {
      if (!user) {
        throw new Error('could not create new user from social login')
      }
      const accessToken = generateAccessToken(user)
      // @ts-ignore
      sendRefreshToken(res, user)
      return {
        accessToken,
        user,
      }
    }
  } catch (e) {
    log(e)
    throw e
  }
}
