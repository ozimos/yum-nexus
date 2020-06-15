import { gql } from '@apollo/client'
import { USER } from './me.query'

export default gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        ...USER
      }
    }
  }
  ${USER}
`
export const LOGOUT = gql`
  mutation LOGOUT {
    logout {
      accessToken
    }
  }
`
