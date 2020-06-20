import { gql } from '@apollo/client'

export const CART_QUERY = gql`
  query CART {
    cart @client {
      id
      meals {
        id
      }
    }
  }
`

export const CART = gql`
  fragment CART on Cart {
    id
    meals {
      id
    }
  }
`
