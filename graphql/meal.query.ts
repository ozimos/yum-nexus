import { gql } from '@apollo/client'

export const MEAL = gql`
  fragment MEAL on Meal {
    id
    title
    description
    price
    imageUrl
  }
`
export const TODAY_MEALS = gql`
  query todayMeals($startOfToday: DateTime!, $endOfToday: DateTime!, $limit: Int!) {
    meals(
      where: {
        menus: { some: { AND: [{ menuDate: { gt: $startOfToday } }, { menuDate: { lt: $endOfToday } }] } }
      }
      first: $limit
    ) {
      ...MEAL
    }
  }
  ${MEAL}
`
export const MORE_TODAY_MEALS = gql`
  query moreTodayMeals($startOfToday: DateTime!, $endOfToday: DateTime!, $limit: Int!, $cursor: String!) {
    meals(
      where: {
        menus: { some: { AND: [{ menuDate: { gt: $startOfToday } }, { menuDate: { lt: $endOfToday } }] } }
      }
      first: $limit
      after: { id: $cursor }
    ) {
      ...MEAL
    }
  }
  ${MEAL}
`
