import { HttpLink } from '@apollo/client'
import { getClientURL, graphPath } from './common'

export default function createHttpLink() {
  return new HttpLink({
    uri: getClientURL(graphPath),
    credentials: 'same-origin',
  })
}
