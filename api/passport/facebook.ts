import { socialCallback } from './socialCallback'

export const facebookCallback = socialCallback('facebookId')

export const facebookOptions = () => ({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `http://localhost:${process.env.PORT}/auth/facebook/callback`,
  profileFields: ['id', 'email', 'first_name', 'last_name'],
})
