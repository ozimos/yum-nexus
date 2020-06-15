import { gql } from '@apollo/client'
import { STORE_PRODUCT } from './storeProduct.query'
import { CART_ID } from './cart.mutation'

export const CART_ITEMS_OLD = gql`
  query CART_ITEMS_OLD {
    cartItems @client {
      id
      qty
      price
      name
      size
      image
    }
  }
`

export const CURRENT_CART_ID = gql`
  query CURRENT_CART_ID {
    currentStoreCart @client @persist {
      ...CART_ID
    }
  }
  ${CART_ID}
`

export const CART_ID = gql`
  query CART_ID($userId: String!) {
    userId @client @export(as: "userId")
    cart(where: { userId: $userId }) {
      ...CART_ID
    }
  }
  ${CART_ID}
`

export const CART_STORE_PRODUCT = gql`
  fragment CART_STORE_PRODUCT on CartStoreProduct {
    id
    cartId
    storeProductId
    quantity
    storeProduct {
      ...STORE_PRODUCT
    }
  }
  ${STORE_PRODUCT}
`

export const STORE_CART = gql`
  fragment STORE_CART on Cart {
    ...CART_ID
    storeProducts {
      ...CART_STORE_PRODUCT
    }
  }
  ${CART_STORE_PRODUCT}
  ${CART_ID}
`

export const CURRENT_STORE_CART = gql`
  query CURRENT_STORE_CART {
    currentStoreCart @client @persist {
      ...STORE_CART
    }
  }
  ${STORE_CART}
`

export const CART_ITEMS = gql`
  query CART_ITEMS {
    me {
      id
      cart {
        ...CART_ID
        storeProducts {
          ...CART_STORE_PRODUCT
        }
      }
    }
  }
  ${CART_STORE_PRODUCT}
  ${CART_ID}
`

export const STORE_CART_ITEMS = gql`
  query STORE_CART_ITEMS($storeId: String!) {
    me {
      id
      cart {
        ...CART_ID

        storeProducts(where: { storeProduct: { storeId: { equals: $storeId } } }) {
          ...CART_STORE_PRODUCT
        }
      }
    }
  }
  ${CART_STORE_PRODUCT}
  ${CART_ID}
`
