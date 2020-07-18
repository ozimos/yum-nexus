import { HttpLink } from '@apollo/client'
import {  graphQLURL } from './common'

export default function createHttpLink() {
  return new HttpLink({
    uri: graphQLURL,
    credentials: 'same-origin',
  })
}
