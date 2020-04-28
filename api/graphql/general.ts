import { schema } from 'nexus'
import { extractTokenPayload, authGuard, handleError } from '../utils/helpers'
import merge from 'lodash/merge'
import { roles } from '../utils/constants'
import errors from '../utils/errors'
import { Path } from 'graphql/jsutils/Path'

const { ADMIN, CATERER, USER } = roles

schema.addToContext(extractTokenPayload)

schema.middleware((config) => {
  const noAuthResolvers = ['login', 'signup', 'me']
  if (noAuthResolvers.includes(config.fieldConfig.name)) {
    return
  }
  return (root, args, ctx, info, next) => {
    if (!info.path.prev) {
      const { role } = authGuard(ctx)
      if (!info.fieldName.match(/Own/i) && role !== USER) {
        handleError(errors.notAuthorized)
      }
    }

    return next(root, args, ctx, info)
  }
})

schema.middleware((config) => {
  if (
    config.parentTypeConfig.name === 'Query' &&
    ['ownOrder'].includes(config.fieldConfig.name)
  ) {
    return (root, args, ctx, info, next) => {
      // @ts-ignore
      const { id } = ctx.tokenPayload
      merge(args, { where: { id } })
      return next(root, args, ctx, info)
    }
  }
  return
})

const genMiddleWare = (regex, forbidFn, idFn) => (config) => {
  if (
    config.parentTypeConfig.name === 'Mutation' &&
    config.fieldConfig.name.match(regex)
  ) {
    return (root, args, ctx, info, next) => {
      const isForCaterers = info.fieldName.match(/(Meal|Menu)/)
      // @ts-ignore
      const { id, role } = ctx.tokenPayload
      const isAuthorized =
        (isForCaterers && [ADMIN, CATERER].includes(role)) || !isForCaterers

      if (isAuthorized && !forbidFn(args.data.user)) {
        merge(args, idFn(id))

        return next(root, args, ctx, info)
      }

      handleError(errors.notAuthorized)
    }
  }
  return
}

schema.middleware((config) => {
  if (
    config.parentTypeConfig.name === 'Mutation' &&
    config.fieldConfig.name.match(/^createOneOwn/)
  ) {
    return (root, args, ctx, info, next) => {
      const isForCaterers = info.fieldName.match(/(Meal|Menu)/)
      // @ts-ignore
      const { id, role } = ctx.tokenPayload
      const isAuthorized =
        (isForCaterers && [ADMIN, CATERER].includes(role)) || !isForCaterers

      if (isAuthorized && Object.keys(args.data.user).length <= 1) {
        merge(args, { data: { user: { connect: { id } } } })

        return next(root, args, ctx, info)
      }

      handleError(errors.notAuthorized)
    }
  }
  return
})

schema.middleware((config) => {
  if (
    config.parentTypeConfig.name === 'Mutation' &&
    config.fieldConfig.name.match(/^(update|delete)OneOwn(?!User)/)
  ) {
    return (root, args, ctx, info, next) => {
      const isForCaterers = info.fieldName.match(/(Meal|Menu)/)
      // @ts-ignore
      const { id, role } = ctx.tokenPayload
      const isAuthorized =
        (isForCaterers && [ADMIN, CATERER].includes(role)) || !isForCaterers

      if (isAuthorized && !args.data?.user) {
        merge(args, { where: { userId: id } })

        return next(root, args, ctx, info)
      }
      handleError(errors.notAuthorized)
    }
  }
  return
})

schema.middleware((config) => {
  if (
    config.parentTypeConfig.name === 'Mutation' &&
    config.fieldConfig.name.match(/^updateOneOwnUser/)
  ) {
    return (root, args, ctx, info, next) => {
      // @ts-ignore
      const { id } = ctx.tokenPayload
      merge(args, { where: { id } })
      return next(root, args, ctx, info)
    }
  }
  return
})
