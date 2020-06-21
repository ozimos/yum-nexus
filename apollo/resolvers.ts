import { gql, Resolvers } from '@apollo/client'
import { getUserId } from '../lib/getUserId'
import { getAccessToken } from '../lib/accessToken'
import { CART_STATUS } from '../graphql/meal.query'
import { CART } from '../graphql/cart.query'
const userId = () => getUserId(getAccessToken())

export const resolvers: Resolvers = {
  Mutation: {
    userId,
    updateCartStatus: (_root, variables, { client }) => {
      client.writeFragment({
        id: `CartStatus:${variables.id}`,
        fragment: CART_STATUS,
        data: {
          id: variables.id,
          isInCart: true,
          cartQty: variables.quantity,
          __typename: 'CartStatus',
        },
      })
      try {
        const myCart = client.readFragment({
          id: 'Cart:myCart',
          fragment: CART,
        })
        if (!myCart?.meals?.some((meal) => meal.id === variables.id)) {
          const data = { id: 'myCart', meals: [...myCart.meals, { id: variables.id, __typename: 'Meal' }] }
          client.writeFragment({
            id: 'Cart:myCart',
            fragment: CART,
            data,
          })
        }
      } catch (err) {
        console.log(err)
        console.log('cart read failed')
        client.writeFragment({
          id: 'Cart:myCart',
          fragment: CART,
          data: { id: 'myCart', meals: [{ id: variables.id, __typename: 'Meal' }] },
        })
      }

      return null
    },
    deleteFromCart: (_root, variables, { client }) => {
      client.writeFragment({
        id: `CartStatus:${variables.id}`,
        fragment: CART_STATUS,
        data: {
          id: variables.id,
          isInCart: false,
          cartQty: 0,
          __typename: 'CartStatus',
        },
      })
      let data = {
        id: 'Cart:myCart',
        __typename: 'Cart',
        meals: [],
      }
      try {
        const myCart = client.readFragment({
          id: 'Cart:myCart',
          fragment: CART,
        })
        if (myCart?.meals) {
          data.meals = myCart?.meals?.filter((meal) => meal.id !== variables.id)
        }
      } catch (err) {
        console.log(err)
        console.log('cart read failed')
        data.meals = []
      } finally {
        client.writeFragment({
          id: 'Cart:myCart',
          fragment: CART,
          data,
        })
      }

      return null
    },
  },
  Query: {
    userId,
  },
  Meal: {
    cartStatus: ({ id, price }, _, { cache }) => {
      let cartQty = 0
      let total = 0
      let isInCart = false

      try {
        const cartStatus = cache.readFragment({
          fragment: CART_STATUS,
          id: `CartStatus:${id}`,
        })
        if (cartStatus) {
          cartQty = cartStatus.quantity || 0
          isInCart = cartQty > 0
          total = cartQty * price
        }
        return { id, cartQty, total, isInCart, __typename: 'CartStatus' }
      } catch (error) {
        console.error(error)
        console.info('cache read for cart status failed')
        return { id, cartQty, total, isInCart, __typename: 'CartStatus' }
      }
    },
  },
  CartStatus: {
    isInCart: ({ isInCart }: { isInCart: boolean }, variables: any) => {
      return variables?.isInCartInput || isInCart || false
    },
    cartQty: ({ cartQty }: { cartQty: number }, variables: any) => {
      return variables?.cartQtyInput || cartQty || 0
    },
  },
}
