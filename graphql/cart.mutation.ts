import { gql } from '@apollo/client'
import { getUserId } from '../lib/getUserId'

export const UPSERT_CART = gql`
  mutation UPSERT_CART($id: String!, $quantity: Int!) {
    updateCartStatus(id: $id, quantity: $quantity) @client(always: true)
  }
`

export const REMOVE_CART_MEAL = gql`
  mutation REMOVE_CART_MEAL($id: String!) {
    deleteFromCart(id: $id) @client(always: true)
  }
`
