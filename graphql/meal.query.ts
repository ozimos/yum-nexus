import { gql } from '@apollo/client'

export const CART_STATUS = gql`
  fragment CART_STATUS on CartStatus {
    id
    isInCart
    cartQty
    total
  }
`

export const CART_STATUS_QUERY = gql`
  query CART_STATUS {
    cartStatus @client {
      ...CART_STATUS
    }
  }
  ${CART_STATUS}
`

export const MEAL = gql`
  fragment MEAL on Meal {
    id
    title
    description
    price
    imageUrl
    cartStatus @client {
      ...CART_STATUS
    }
  }
  ${CART_STATUS}
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

export const PROJECTED_MEALS = gql`
  query projectedMeals($projected: [String!], $limit: Int!) {
    meals(where: { id: { in: $projected } }, first: $limit) {
      ...MEAL
    }
  }
  ${MEAL}
`
export const MORE_PROJECTED_MEALS = gql`
  query moreProjectedMeals($projected: [String!], $limit: Int!, $cursor: String!) {
    meals(where: { id: { in: $projected } }, first: $limit, after: { id: $cursor }) {
      ...MEAL
    }
  }
  ${MEAL}
`
