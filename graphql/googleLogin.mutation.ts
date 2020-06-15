import { gql } from '@apollo/client'
import { USER } from './me.query'

const GOOGLE_LOGIN = gql`
  mutation GOOGLE_LOGIN($token: String!) {
    loginWithGoogle(token: $token) {
      accessToken
      user {
        ...USER
      }
    }
  }
  ${USER}
`

export default GOOGLE_LOGIN
