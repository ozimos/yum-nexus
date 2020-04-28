import { schema } from 'nexus'
import { authGuard, handleError, generateAccessToken } from '../utils/helpers'
import errors from '../utils/errors'
import { compare } from 'bcrypt'

schema.queryType({
  definition(t) {
    t.crud.user()
    t.crud.users({ ordering: true })
    t.crud.meal()
    t.crud.meals({ filtering: true })
    t.field('me', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        const { id } = authGuard(ctx)
        return ctx.db.user.findOne({ where: { id } })
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
              email,
            },
          })
        } catch (e) {
          handleError(errors.invalidUser)
        }

        if (!user) handleError(errors.invalidUser)
        const { password, ...confirmedUser } = user
        const passwordValid = await compare(inputPassword, password)
        if (!passwordValid) handleError(errors.invalidUser)

        const accessToken = generateAccessToken(confirmedUser)
        return {
          accessToken,
          user: confirmedUser,
        }
      },
    })
  },
})
