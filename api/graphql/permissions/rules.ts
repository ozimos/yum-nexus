import { rule } from 'nexus-plugin-shield'
import { authGuard } from '../../utils/helpers'
import { Role } from '../../utils/constants'
import { TokenPayload } from '../../utils/helpers'

export default {
  isAuthenticated: rule({ cache: 'contextual' })((_parent, _args, ctx) => {
    try {
      const tokenPayload: TokenPayload = authGuard(ctx)
      return Boolean(tokenPayload)
    } catch (e) {
      return e
    }
  }),
  canEditOnlyOwnRecord: rule({ cache: 'contextual' })(async (_parent, { where: { connect } }, ctx) => {
    const tokenPayload: TokenPayload = authGuard(ctx)
    try {
      return tokenPayload.id === connect.userId
    } catch (e) {
      return e
    }
  }),
  hasValidRoles: (validRoles: Array<Role>) =>
    rule({ cache: 'contextual' })(async (_parent, _args, ctx) => {
      const tokenPayload: TokenPayload = authGuard(ctx)
      return validRoles.some((role) => tokenPayload.roles.includes(role))
    }),

  canViewOnlyOwnRecord: rule({ cache: 'contextual' })(async (_parent, args, ctx) => {
    const tokenPayload: TokenPayload = authGuard(ctx)
    try {
      const { id } = tokenPayload
      return id === args.where?.id || id === args.where?.userId
    } catch (e) {
      return e
    }
  }),
}
