import { schema } from 'nexus'
import { generateAccessToken, handleError } from '../utils/helpers'
import { hash } from 'bcrypt'
import errors from '../utils/errors'

schema.mutationType({
  definition(t) {
    t.crud.createOneMeal()
    t.crud.createOneMenu()
    t.crud.createOneMeal({ alias: 'createOneOwnMeal' })
    t.crud.updateOneMeal()
    t.crud.updateOneMeal({ alias: 'updateOneOwnMeal' })
    t.crud.deleteOneUser()
    t.crud.deleteOneMeal()
    t.crud.deleteOneMeal({ alias: 'deleteOneOwnMeal' })

    t.field('signup', {
      type: 'AuthPayload',
      args: {
        firstName: schema.stringArg({ nullable: true }),
        lastName: schema.stringArg({ nullable: true }),
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
      },
      resolve: async (
        _parent,
        { firstName, lastName, email, password: newPassword },
        ctx,
      ) => {
        const hashedPassword = await hash(newPassword, 10)
        let user, password
        try {
          ;({ password, ...user } = await ctx.db.user.create({
            data: {
              firstName,
              lastName,
              email,
              password: hashedPassword,
            },
          }))
        } catch (e) {
          handleError(errors.invalidUserEmail)
        }
        const accessToken = generateAccessToken(user)
        return {
          accessToken,
          user,
        }
      },
    })
  },
})
