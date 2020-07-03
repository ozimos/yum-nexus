export class ClientError extends Error {
  constructor(message: string, name = 'general') {
    super(
      JSON.stringify({
        name,
        message,
        type: 'server',
      })
    )
    this.name = 'ClientError'
  }
}
export class NoTokenError extends ClientError {
  constructor(message: string) {
    super(message)
    this.name = 'NoTokenError'
  }
}
export class AuthenticationError extends ClientError {
  constructor(message: string, name?: string) {
    super(message, name)
    this.name = 'AuthenticationError'
  }
}
export default {
  notAuthenticated: new ClientError('Unauthenticated user!'),
  notAuthorized: new ClientError('You are not authorized to perform this action!'),
  invalidToken: new ClientError('Invalid Token!'),
  invalidUser: new AuthenticationError('Invalid email or password'),
  invalidUserEmail: new AuthenticationError('The email has already been taken', 'email'),
}
