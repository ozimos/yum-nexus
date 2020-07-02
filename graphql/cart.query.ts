import { gql } from '@apollo/client'
import {MEAL} from './meal.query'

export const CART_QUERY = gql`
  query CART {
    cart @client {
      id
      meals {
      ...MEAL
      }
    }
  }
  ${MEAL}
`

export const CART = gql`
  fragment CART on Cart {
    id
    meals {
      id
    }
  }
`
