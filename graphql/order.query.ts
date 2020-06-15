import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
  mutation orderMutation($userId: String!, $meals: [MealOrderCreateWithoutOrderInput!], $addressId: String) {
    createOneOrder(
      data: {
        user: { connect: { id: $userId } }
        meals: { create: $meals }
        deliveryAddress: { connect: { id: $addressId } }
      }
    ) {
      id
    }
  }
`

const GET_ORDERS = gql`
  query GetOrders {
    me {
      id
      orders {
        id
        meals {
          id
        }
        status
        deliveryAddress {
          id
          state
          street1
          street2
          areaCode
          lga
        }
      }
    }
  }
`

export default GET_ORDERS
