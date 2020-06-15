import { gql } from '@apollo/client'

export const CREATE_ADDRESS = gql`
  mutation addressMutation(
    $lga: String!
    $state: String!
    $street1: String!
    $street2: String
    $areaCode: Int!
    $userId: String!
  ) {
    createOneAddress(
      data: {
        lga: $lga
        state: $state
        street1: $street1
        street2: $street2
        areaCode: $areaCode
        user: { connect: { id: $userId } }
      }
    ) {
      id
      state
      street1
      street2
      areaCode
      lga
    }
  }
`

export const UPDATE_ADDRESS = gql`
  mutation updateMutation(
    $lga: String
    $state: String
    $street1: String
    $street2: String
    $areaCode: Int
    $addressId: String!
  ) {
    updateOneAddress(
      data: { lga: $lga, state: $state, street1: $street1, street2: $street2, areaCode: $areaCode }
      where: { id: $addressId }
    ) {
      id
      state
      street1
      street2
      areaCode
      lga
    }
  }
`

const GET_ADDRESSES = gql`
  query GetAddresses {
    me {
      id
      addresses {
        id
        state
        street1
        street2
        areaCode
        lga
      }
    }
  }
`

export default GET_ADDRESSES
