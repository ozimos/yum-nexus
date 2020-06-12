const bcrypt = require('bcryptjs')
/* eslint-disable-next-line import/no-extraneous-dependencies */
const faker = require('faker/locale/en')
const flattenDeep = require('lodash/flattenDeep')
const sampleSize = require('lodash/sampleSize')
const {
  userFactory,
  mealFactory,
  menuFactory,
  orderFactory,
  mealMenuFactory,
  mealOrderFactory,
  addressFactory,
  defaultAddressFactory,
} = require('./factory')

const seedPassword = 'Thisisatestpassword'
const salt = bcrypt.genSaltSync(10)
const hashPassword = bcrypt.hashSync(seedPassword, salt)

const seedUsers = Array.from({ length: 8 }, () =>
  userFactory({ password: hashPassword, roles: { set: [] } }),
)
const seedCaterers = Array.from({ length: 4 }, () =>
  userFactory({ password: hashPassword, roles: { set: [`CATERER`] } }),
)
const adminUser = userFactory({
  email: 'admin_user@yum.com'.toLowerCase(),
  password: hashPassword,
  roles: { set: [`ADMIN`] },
})
const adminCaterer = userFactory({
  email: 'admin_caterer@yum.com'.toLowerCase(),
  password: hashPassword,
  roles: { set: [`ADMIN`, `CATERER`] },
})
const seedCustomers = seedUsers.concat(seedCaterers)
const allUsers = seedUsers.concat([adminCaterer, adminUser], seedCaterers)

const seedAddressesNested = allUsers.map(({ id }) => {
  const user = { connect: { id } }
  return Array.from({ length: 4 }, () => addressFactory({ user }))
})
const seedAddresses = flattenDeep(seedAddressesNested)

const defaultAddresses = seedAddressesNested.map((nestedUser, index) => {
  const { id: addressId } = nestedUser[0]
  const { id: userId } = allUsers[index]
  const address = { connect: { id: addressId } }
  const user = { connect: { id: userId } }

  return defaultAddressFactory({ address, user })
})

const seedMealsNested = seedCaterers.map(({ id }) => {
  const user = { connect: { id } }
  return Array.from({ length: 6 }, () => mealFactory({ user }))
})
const seedMeals = flattenDeep(seedMealsNested)

const seedMenus = seedCaterers.map(({ id }) =>
  menuFactory({ user: { connect: { id } } }),
)

const seedOrders = Array.from({ length: 8 }, () =>
  orderFactory({
    user: { connect: { id: faker.random.arrayElement(seedCustomers).id } },
  }),
)
const seedMealMenusNested = seedMenus.map((menu, index) =>
  mealMenuFactory(menu, seedMealsNested[index], 3),
)
const seedMealMenus = flattenDeep(seedMealMenusNested)

const seedMealOrdersNested = seedOrders.map((order) => {
  const min = 2
  return mealOrderFactory(
    order,
    sampleSize(seedMeals, faker.random.number({ min, max: seedMeals.length })),
    min,
  )
})

const seedMealOrders = flattenDeep(seedMealOrdersNested)

module.exports = {
  seedPassword,
  hashPassword,
  seedUsers,
  adminUser,
  adminCaterer,
  seedCaterers,
  allUsers,
  seedAddresses,
  defaultAddresses,
  seedMeals,
  seedMenus,
  seedMealMenus,
  seedOrders,
  seedMealOrders,
}
