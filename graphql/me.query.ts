import { gql } from '@apollo/client'

export const USER = gql`
  fragment USER on User {
    id
    firstName
    lastName
    email
    roles
  }
`

const ME = gql`
  query ME {
    me {
      ...USER
    }
  }
  ${USER}
`

export default ME
