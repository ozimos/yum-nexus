import { schema } from 'nexus'

schema.inputObjectType({
  name: 'UserCreateOneWithoutMealsInput',
  definition(t) {
    t.field('connect', {
      type: 'UserWhereUniqueInput',
    })
  },
})

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.firstName()
    t.model.lastName()
    t.model.role()
    t.model.email()
    t.model.meals()
    t.model.addresses({
      pagination: { first: true },
    })
  },
})

schema.objectType({
  name: 'Meal',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.description()
    t.model.price()
    t.model.caterer()
  },
})

schema.objectType({
  name: 'Menu',
  definition(t) {
    t.model.caterer()
    t.model.id()
    t.model.menuDate()
    t.model.userId()
  },
})

schema.objectType({
  name: 'Address',
  definition(t) {
    t.model.id()
    t.model.lga()
    t.model.state()
    t.model.areaCode()
  },
})

schema.objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('accessToken')
    t.field('user', { type: 'User' })
  },
})
