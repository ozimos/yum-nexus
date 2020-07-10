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
    t.model.roles()
    t.model.email()
    t.model.meals()
    t.model.orders()
    t.model.defaultAddress()
    t.model.defaultMenu()
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
    t.model.tags()
    t.model.price()
    t.model.user()
    t.model.menus()
    t.model.imageUrl()
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
    t.model.default()
  },
})

schema.objectType({
  name: 'DefaultMenu',
  definition(t) {
    t.model.createdAt()
    t.model.updatedAt()
    t.model.id()
    t.model.user()
    t.model.userId()
    t.model.menu()
    t.model.menuId()
  },
})
schema.objectType({
  name: 'DefaultAddress',
  definition(t) {
    t.model.createdAt()
    t.model.updatedAt()
    t.model.id()
    t.model.user()
    t.model.userId()
    t.model.address()
    t.model.addressId()
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
    t.model.deliveryAddress()
  },
})

schema.objectType({
  name: 'MealOrder',
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
    t.model.street1()
    t.model.street2()
    t.model.lga()
    t.model.state()
    t.model.areaCode()
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

schema.enumType({
  name: 'Role',
  members: ['ADMIN', 'CATERER'],
})
