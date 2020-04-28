import { schema } from 'nexus'
import { extractTokenPayload, authGuard, handleError } from '../utils/helpers'
import merge from 'lodash/merge'
import { roles } from '../utils/constants'
import errors from '../utils/errors'
import { Path } from 'graphql/jsutils/Path'

import { adjustUserInputPlugin } from './plugins'

// @ts-ignore
// schema.use(adjustUserInputPlugin)

const { ADMIN, CATERER, USER } = roles
function containsInPath(obj: Path | undefined, vals: Array<string>) {
  if (obj === undefined) {
    return false
  }
  if (vals.some((val) => obj?.key === val)) {
    return true
  }
  return containsInPath(obj.prev, vals)
}

schema.addToContext(extractTokenPayload)

schema.middleware((config) => {
  const noAuthResolvers = ['login', 'signup']
  if (noAuthResolvers.includes(config.fieldConfig.name)) {
    return
  }
  return (root, args, ctx, info, next) => {
    if (!containsInPath(info.path, noAuthResolvers)) {
      authGuard(ctx)
    }
    return next(root, args, ctx, info)
  }
})

schema.middleware((config) => {
  if (
    config.parentTypeConfig.name === 'Query' &&
    ['me', 'filterMeals', 'meal'].includes(config.fieldConfig.name)
  ) {
    return (root, args, ctx, info, next) => {
      // @ts-ignore
      const { userId } = ctx.tokenPayload
      merge(args, { data: { where: { userId } } })
      return next(root, args, ctx, info)
    }
  }
  return
})

schema.middleware((config) => {
  if (
    config.parentTypeConfig.name === 'Mutation' &&
    config.fieldConfig.name.match(/\w{2,}(Meal|Menu)\w{2,}/)
  ) {
    return (root, args, ctx, info, next) => {
      // @ts-ignore
      const { userId, role } = ctx.tokenPayload
      const isAuthorized = [ADMIN, CATERER].includes(role) || (role === ADMIN && args.data.caterer?.create)
      
      if (!isAuthorized) {
        handleError(errors.notAuthorized)
      }
      
      if (role === CATERER) {
        merge(args, { data: { caterer: { connect: { id: userId } } } })
      }
      return next(root, args, ctx, info)
    }
  }
  return
})
