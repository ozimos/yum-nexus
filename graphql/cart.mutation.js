import { gql } from '@apollo/client'
import { getUserId } from '../lib/getUserId'

export const REMOVE_CART_ITEM = gql`
  mutation REMOVE_CART_ITEM($storeProductId: String!, $cartId: String!) {
    deleteOneCartStoreProduct(
      where: { cartStoreProduct: { storeProductId: $storeProductId, cartId: $cartId } }
    ) {
      cartId
      storeProductId
    }
  }
`

export const CART_ID = gql`
  fragment CART_ID on Cart {
    id
    userId
  }
`

export const UPSERT_CART = gql`
  mutation UPSERT_CART($userId: String!) {
    upsertOneCart(create: { user: { connect: { id: $userId } } }, update: {}, where: { userId: $userId }) {
      ...CART_ID
    }
  }
  ${CART_ID}
`

export const UPDATE_CART_ITEM = gql`
  mutation UPDATE_CART_ITEM($cartId: String!, $storeProductId: String!, $quantity: Int!) {
    updateOneCart(
      data: {
        storeProducts: {
          upsert: {
            where: { cartStoreProduct: { storeProductId: $storeProductId, cartId: $cartId } }
            update: { quantity: $quantity }
            create: { storeProduct: { connect: { id: $storeProductId } }, quantity: $quantity }
          }
        }
      }
      where: { id: $cartId }
    ) {
      id
      userId
      storeProducts(where: { storeProductId: { equals: $storeProductId }, cartId: { equals: $cartId } })
        @persist {
        id
        cartId
        storeProductId
        quantity
        upsertCartData(quantity: $quantity) @client(always: true)
        storeProduct {
          id
          cartStatus @client {
            id
            isInCart
            cartQty
          }
        }
      }
    }
  }
`

export const currentStoreCartCacheId = 'Cart:currentStore'

export const getCartCacheId = (userId: string) => `Cart:${userId}`

export function optimisticRemoveCartItemResponse(cartId: string, storeProductId: string) {
  return {
    __typename: 'Mutation',
    deleteOneCartStoreProduct: {
      __typename: 'CartStoreProduct',
      cartId,
      storeProductId,
      storeProduct: {
        __typename: 'StoreProduct',
        isInCart: false,
        cartQty: 0,
        id: storeProductId,
      },
    },
  }
}

export function optimisticUpdateCartItemResponse(cartId: string, storeProductId: string, quantity: number) {
  const userId = getUserId()

  return {
    __typename: 'Mutation',
    updateOneCart: {
      id: cartId,
      userId,
      __typename: 'Cart',
      storeProducts: [
        {
          __typename: 'CartStoreProduct',
          cartId,
          storeProductId,
          quantity,
          storeProduct: {
            __typename: 'StoreProduct',
            cartStatus: {
              __typename: 'CartStatus',
              isInCart: Boolean(quantity),
              cartQty: quantity,
              id: storeProductId,
            },
            id: storeProductId,
          },
        },
      ],
    },
  }
}
