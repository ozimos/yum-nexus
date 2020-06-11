import { schema } from 'nexus'

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.createdAt()
    t.model.updatedAt()
    t.model.id()
    t.model.firstName()
    t.model.lastName()
    t.model.tokenVersion()
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
    t.model.createdAt()
    t.model.updatedAt()
    t.model.id()
    t.model.title()
    t.model.description()
    t.model.price()
    t.model.user()
  },
})

schema.objectType({
  name: 'Menu',
  definition(t) {
    t.model.createdAt()
    t.model.updatedAt()
    t.model.user()
    t.model.id()
    t.model.menuDate()
    t.model.userId()
    t.model.meals()
  },
})

schema.objectType({
  name: 'Order',
  definition(t) {
    t.model.createdAt()
    t.model.updatedAt()
    t.model.id()
    t.model.userId()
    t.model.user()
    t.model.status()
    t.model.meals()
  },
})

schema.objectType({
  name: 'MealsOnOrders',
  definition(t) {
    t.model.id()
    t.model.meal()
    t.model.order()
    t.model.orderId()
    t.model.mealId()
  },
})
schema.objectType({
  name: 'Address',
  definition(t) {
    t.model.createdAt()
    t.model.updatedAt()
    t.model.id()
    t.model.lga()
    t.model.state()
    t.model.areaCode()
  },
})

schema.objectType({
  name: 'TokenUser',
  // @ts-ignore
  rootTyping: 'User',
  definition(t) {
    t.string('id')
    t.string('role')
    t.string('tokenVersion')
  },
})

schema.objectType({
  name: 'LogoutResponse',
  definition(t) {
    t.string('accessToken', {
      resolve() {
        return ''
      },
    })
  },
})

schema.objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('accessToken')
    t.field('user', { type: 'User' })
  },
})
