import { gql } from '@apollo/client'

export const CART_STATUS = gql`
  fragment CART_STATUS on CartStatus {
    id
    isInCart
    cartQty
  }
`

export const CART_STATUS = gql`
  query CART_STATUS($id: String!) {
    cartStatus(id: $id) @client @persist {
      ...CART_STATUS
    }
  }
  ${CART_STATUS}
`

export const STORE_PRODUCT_CART_STATUS = gql`
  fragment STORE_PRODUCT_CART_STATUS on StoreProduct {
    id
    cartStatus @client @persist {
      ...CART_STATUS
    }
  }
  ${CART_STATUS}
`

export const STORE_PRODUCT = gql`
  fragment STORE_PRODUCT on StoreProduct {
    id
    price
    remainingStock
    cartStatus @client @persist {
      ...CART_STATUS
    }
    product {
      id
      name
      size
      images
      slug
      description
      department {
        id
        name
      }
    }
  }
  ${CART_STATUS}
`

export const STORE_PRODUCT = gql`
  query STORE_PRODUCT($storeProductId: String!) {
    storeProduct(where: { id: $storeProductId }) {
      ...STORE_PRODUCT
    }
  }
  ${STORE_PRODUCT}
`

export const ALL_STORE_PRODUCTS = gql`
  query ALL_STORE_PRODUCTS($storeId: String!) {
    storeProducts(where: { storeId: { equals: $storeId } }) {
      ...STORE_PRODUCT
    }
  }
  ${STORE_PRODUCT}
`
