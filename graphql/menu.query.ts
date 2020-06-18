import { gql } from '@apollo/client'
import { MEAL } from './meal.query'

export const TODAY_MENU = gql`
  query todayMenu($yesterday: DateTime!, $tomorrow: DateTime!) {
    menus(where: { AND: [{ menuDate: { gt: $yesterday } }, { menuDate: { lt: $tomorrow } }] }) {
      id
      meals {
        ...MEAL
      }
    }
  }
  ${MEAL}
`
