import { gql } from '@apollo/client'
import { getUserId } from '../lib/getUserId'

export const UPSERT_CART = gql`
  mutation UPSERT_CART($id: String!, $quantity: Int!) {
    updateCartStatus(quantity: $quantity, id: $id) @client(always: true)
  }
`
