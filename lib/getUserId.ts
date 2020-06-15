import JwtDecode from 'jwt-decode'
import { getAccessToken } from './accessToken'

export function getUserId(token: string = '') {
  const accessToken = token || getAccessToken()
  let id = ''
  try {
    if (accessToken) {
      ;({ id } = JwtDecode(accessToken))
    }
  } catch (error) {
    console.error(error)
  } finally {
    return id
  }
}
