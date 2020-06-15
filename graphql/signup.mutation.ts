import { gql } from '@apollo/client'
import { USER } from './me.query'

export default gql`
  mutation SIGNUP($email: String!, $firstName: String, $lastName: String, $password: String!) {
    signup(email: $email, firstName: $firstName, lastName: $lastName, password: $password, roles: []) {
      user {
        ...USER
      }
    }
  }
  ${USER}
`
