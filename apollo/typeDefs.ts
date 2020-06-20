import { gql } from '@apollo/client'

export default gql`
  extend type Query {
    userId: ID!
    cart: Cart!
    cartStatus: CartStatus!
  }

  extend type Meal {
    cartStatus: CartStatus
  }

  type CartStatus {
    id: ID!
    isInCart: Boolean!
    cartQty: Int!
    total: Float!
  }

  type Cart {
    id: ID!
    meals: [Meal!]
  }

  extend type User {
    imageUrl: String
    name: String
  }

  extend type Mutation {
    userId: ID!
    updateCartStatus(id: String!, quantity: Int!): ID
  }
`
