import { gql } from '@apollo/client'
import { USER } from './me.query'

const FACEBOOK_LOGIN = gql`
  mutation FACEBOOK_LOGIN($token: String!) {
    loginWithFaceBook(token: $token) {
      accessToken
      user {
        ...USER
      }
    }
  }
  ${USER}
`

export default FACEBOOK_LOGIN
