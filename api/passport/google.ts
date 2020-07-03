import { OAuth2Client } from 'google-auth-library'
// import { socialCallback } from './socialCallback'

// export const googleCallback = socialCallback('googleId')

// export const googleOptions = () => ({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_APP_SECRET,
//   callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
//   profileFields: ['id', 'email', 'first_name', 'last_name'],
// })

// export async function googleFrontEndSignIn(req, res, next) {
//   const { token } = req.body
//   const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
//   const callback = (error, user) => {
//     if (error) {
//       return res.status(400).json({ message: error.message })
//     }
//     if (!user) {
//       return res.status(404).json({ message: 'Unauthorized: Could not obtain user' })
//     }
//     req.user = user
//     next()
//   }
//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: [process.env.GOOGLE_CLIENT_ID || ''], // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//     })
//     const payload = ticket.getPayload()
//     const { sub: id, email, family_name: familyName, given_name: givenName } = payload

//     const profile = {
//       emails: [{ value: email }],
//       name: { familyName, givenName },
//       id,
//     }
//     return googleCallback(null, null, profile, callback)
//   } catch (error) {
//     return res.status(400).json({ message: error.message })
//   }
// }
