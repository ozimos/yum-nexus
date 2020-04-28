import { plugin, extendInputType } from '@nexus/schema'

const UserCreateOneWithoutMealsInput = extendInputType({
  type: 'UserCreateOneWithoutMealsInput',
  definition(t) {
    t.string('create', {
      description: 'this argument is no longer supported',
      deprecation: 'this argument is no longer supported',
    })
  },
})
const UserCreateOneWithoutMenusInput = extendInputType({
  type: 'UserCreateOneWithoutMenusInput',
  definition(t) {
    t.string('create', {
      description: 'this argument is no longer supported',
      deprecation: 'this argument is no longer supported',
    })
  },
})
const UserCreateOneWithoutOrdersInput = extendInputType({
  type: 'UserCreateOneWithoutOrdersInput',
  definition(t) {
    t.string('create', {
      description: 'this argument is no longer supported',
      deprecation: 'this argument is no longer supported',
    })
  },
})

export const adjustUserInputPlugin = plugin({
  name: 'adjustUserInput',
  onBeforeBuild({ addType }) {
    addType(UserCreateOneWithoutMealsInput)
    addType(UserCreateOneWithoutMenusInput)
    addType(UserCreateOneWithoutOrdersInput)
  },
})
