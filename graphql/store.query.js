import { gql } from '@apollo/client'

export const STORE = gql`
  query STORE($storeId: String!) {
    store(where: { id: $storeId }) {
      id
      name
      image
    }
  }
`

export const CURRENT_STORE = gql`
  query CURRENT_STORE {
    currentStore @client @persist {
      id
      name
      image
    }
  }
`

export const ALL_STORES = gql`
  query ALL_STORES {
    stores {
      id
      slug
      name
      address
      image
      operationTime
    }
  }
`

export const ALL_STORE_IDS = gql`
  query ALL_STORE_IDS {
    stores {
      id
    }
  }
`
