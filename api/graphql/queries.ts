import { schema } from 'nexus'
import endOfToday from 'date-fns/endOfToday'
import startOfToday from 'date-fns/startOfToday'
import { CustomFieldResolver } from 'nexus-prisma/dist/typegen/static'
import { authGuard } from '../utils/helpers'

const menuMealsResolver: CustomFieldResolver<'Query', 'menuMeals'> = async (
  root,
  args,
  ctx,
  info,
  originalResolver
) => {
  const meals = await ctx.db.queryRaw<Array<{ mealId: string }>>`SELECT "A" AS "mealId" FROM "_MealMenu" 
LEFT JOIN 
(SELECT CASE WHEN menus.id = NULL
THEN menus."menuId"
ELSE menus.id
END AS "finalId" FROM 
(SELECT "DefaultMenu"."menuId", "Menu".id FROM "DefaultMenu" 
FULL OUTER JOIN "Menu" ON "Menu"."userId" = "DefaultMenu"."userId" 
WHERE "Menu"."menuDate" BETWEEN ${startOfToday()} AND ${endOfToday()}) 
AS menus)
AS ids ON "_MealMenu"."B" = ids."finalId" ORDER BY "mealId"`
  info.variableValues.projected = meals.map(({ mealId }) => mealId)
  return originalResolver(root, args, ctx, info)
}
schema.queryType({
  definition(t) {
    t.crud.user()
    t.crud.meal()
    t.crud.menu()
    t.crud.order()
    t.crud.users({ filtering: true, ordering: true })
    t.crud.meals({ filtering: true, pagination: true })
    t.crud.meals({ alias: 'menuMeals', filtering: true, pagination: true, resolve: menuMealsResolver }),
    t.crud.menus({ filtering: true, pagination: true })
    t.crud.orders({ filtering: true })
    t.crud.defaultMenu()
    t.crud.defaultMenus()
    t.crud.defaultAddress()
    t.field('me', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        const { id } = authGuard(ctx)
        return ctx.db.user.findOne({ where: { id } })
      },
    })
  },
})
