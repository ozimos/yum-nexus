/* eslint-disable-next-line import/no-extraneous-dependencies */
const faker = require('faker/locale/en')
const bcrypt = require('bcryptjs')
const cuid = require('cuid')

const salt = bcrypt.genSaltSync(10)
const hashPassword = bcrypt.hashSync(faker.internet.password(), salt)
const roles = [[], [`ADMIN`], [`CATERER`], [`ADMIN`, `CATERER`]]
const status = [`DISPATCHED`, `FULFILLED`, `PENDING`, `PROCESSING`]
const zipCodes = [
  101283,
  100271,
  100269,
  104101,
  101245,
  101241,
  101212,
  101299,
]

const userFactory = (defaults = {}) => ({
  id: cuid(),

  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email().toLowerCase(),
  password: hashPassword,
  roles: { set: faker.random.arrayElement(roles) },
  ...defaults,
})
const addressFactory = ({ user, ...defaults } = {}) => ({
  id: cuid(),
  street1: faker.address.streetAddress(),
  lga: faker.address.city(),
  state: faker.address.state(),
  areaCode: faker.random.arrayElement(zipCodes),
  get user() {
    if (user && !user.create) return user
    return { create: userFactory(user.create) }
  },
  ...defaults,
})

const defaultAddressFactory = ({ address, user, ...defaults } = {}) => ({
  id: cuid(),
  get address() {
    if (address && !address.create) return address
    return { create: addressFactory(address.create) }
  },
  get user() {
    if (user && !user.create) return user
    return { create: userFactory(user.create) }
  },
  ...defaults,
})

const mealFactory = ({ user, defaults } = {}) => ({
  id: cuid(),

  get user() {
    if (user && !user.create) return user
    return { create: userFactory(user.create) }
  },
  title: faker.random.words(faker.random.number({ max: 4, min: 2 })),
  description: faker.lorem.sentence(),
  imageUrl: `${faker.image.food}?random=${Date.now()}`,
  price: faker.random.number({ min: 1500, max: 3000 }),
  ...defaults,
})

const menuFactory = ({ user, defaults } = {}) => ({
  id: cuid(),
  get user() {
    if (user && !user.create) return user
    return { create: userFactory(user.create) }
  },
  menuDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...defaults,
})

const orderFactory = ({ user, defaults } = {}) => ({
  id: cuid(),
  get user() {
    if (user && !user.create) return user
    return { create: userFactory(user.create) }
  },
  status: faker.random.arrayElement(status),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...defaults,
})

const mealMenuFactory = ({ id }, meals, min) => {
  const max = meals.length
  const length = min ? faker.random.number({ min, max }) : max
  return Array.from({ length }, (v, k) => ({
    data: {
      meals: {
        connect: {
          id: meals[k].id,
        },
      },
    },
    where: { id },
  }))
}

const mealOrderFactory = (order, meals, min) => {
  const max = meals.length
  const length = min ? faker.random.number({ min, max }) : max
  return Array.from({ length }, (v, k) => ({
    id: cuid(),

    quantity: faker.random.number({ min: 1, max: 10 }),
    meal: { connect: { id: meals[k].id } },
    order: { connect: { id: order.id } },
  }))
}

module.exports = {
  userFactory,
  mealFactory,
  menuFactory,
  orderFactory,
  mealMenuFactory,
  mealOrderFactory,
  addressFactory,
  defaultAddressFactory,
}
