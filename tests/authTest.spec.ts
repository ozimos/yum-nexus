import { createTestContext } from './__helpers'

const ctx = createTestContext()

it('makes sure a user was registered', async () => {
  // ctx.app.query sends requests to your locally running nexus server
  const {
    signup: { user },
  } = await ctx.app.query(`
    mutation {
      signup(
        firstName: "assad"
        lastName: "elmarakbi"
        email: "assad@elmarakbi.com"
        password: "somerandompassword"
        role: ADMIN)
      {
        user {
          id
          firstName
          lastName
          email
        }
        accessToken
      }
    }
  `)
  const userInfo = {
    firstName: 'assad',
    lastName: 'elmarakbi',
    email: 'assad@elmarakbi.com',
  }
  expect(user).toMatchObject(userInfo)
})
