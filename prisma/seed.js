const { PrismaClient } = require('@prisma/client')
const {
  allUsers,
  seedAddresses,
  defaultAddresses,
  seedMeals,
  seedMenus,
  seedMealMenus,
  seedOrders,
  seedMealOrders,
} = require('./seeder')

const db = new PrismaClient()

main()

async function main() {
  let results
  try {
    results = await Promise.all(
      allUsers.map((data) => db.user.create({ data })),
    )

    console.log('Seeded: %j', results)

    results = await Promise.all(
      seedAddresses.map((data) => db.address.create({ data })),
    )

    console.log('Seeded: %j', results)

    results = await Promise.all(
      defaultAddresses.map((data) => db.defaultAddress.create({ data })),
    )

    console.log('Seeded: %j', results)

    results = await Promise.all(
      seedMeals.map((data) => db.meal.create({ data })),
    )

    console.log('Seeded: %j', results)

    results = await Promise.all(
      seedMenus.map((data) => db.menu.create({ data })),
    )

    console.log('Seeded: %j', results)

    results = await Promise.all(
      seedOrders.map((data) => db.order.create({ data })),
    )

    console.log('Seeded: %j', results)

    results = await Promise.all(
      seedMealOrders.map((data) => db.mealOrder.create({ data })),
    )

    console.log('Seeded: %j', results)

    results = await Promise.all(
      seedMealMenus.map((entry) => db.menu.update(entry)),
    )

    console.log('Seeded: %j', results)
  } catch (error) {
    console.dir(error)
  } finally {
    db.disconnect()
  }
}
