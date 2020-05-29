import { schema } from 'nexus'
import { authGuard } from '../utils/helpers'

schema.queryType({
  definition(t) {
    t.crud.user()
    t.crud.meal()
    t.crud.menu()
    t.crud.order()
    t.crud.users({ ordering: true })
    t.crud.meals({ filtering: true })
    t.crud.menus({ filtering: true })
    t.crud.orders({ filtering: true })
    t.field('me', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        const { id } = authGuard(ctx)
        return ctx.db.user.findOne({ where: { id } })
      },
    })
  },
})
