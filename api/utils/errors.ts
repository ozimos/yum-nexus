export default {
  notAuthenticated: new Error('Unauthenticated user!'),
  notAuthorized: new Error('You are not authorized to perform this action!'),
  invalidToken: new Error('Invalid Token!'),
  invalidUser: new Error('Invalid email or password'),
  invalidUserEmail: new Error('The email has already been taken'),
}
