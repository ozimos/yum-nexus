import { rule } from 'graphql-shield'
import { authGuard } from '../utils/helpers'
import { roles } from '../utils/constants'

export default {
  isAuthenticated: rule({ cache: 'contextual' })((_parent, _args, ctx) => {
    try {
      const tokenPayload = authGuard(ctx)
      return Boolean(tokenPayload)
    } catch (e) {
      return e
    }
  }),
  canEditOnlyOwnRecord: rule({ cache: 'contextual' })(
    async (_parent, { where: { connect } }, ctx) => {
      const tokenPayload = authGuard(ctx)
      try {
        return tokenPayload.id === connect.userId
      } catch (e) {
        return e
      }
    },
  ),
  hasValidRoles: (validRoles: Array<roles>) =>
    rule({ cache: 'contextual' })(async (_parent, _args, ctx) => {
      const tokenPayload = authGuard(ctx)
      return validRoles.includes(tokenPayload.role)
    }),

  canViewOnlyOwnRecord: rule({ cache: 'contextual' })(
    async (_parent, args, ctx) => {
      const tokenPayload = authGuard(ctx)
      try {
        return tokenPayload.id === args.where?.id
      } catch (e) {
        return e
      }
    },
  ),
}
