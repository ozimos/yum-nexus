import GoogleLogin from 'react-google-login'
import { useState } from 'react'
import { GoogleLoginButton as LoginButton } from 'react-social-login-buttons'
import { useApolloClient } from '@apollo/client'
import Router from 'next/router'
import { setAccessToken } from '../lib/accessToken'
import { useGoogle_LoginMutation } from '../generated/graphql'
import ME_QUERY from '../graphql/me.query'

interface GoogleLoginProps {
  successPath?: string
}
export default function GoogleLoginButton({ successPath = '/meals' }: GoogleLoginProps) {
  const [googleLoginError, setGoogleError] = useState('')
  const [loginError, setError] = useState('')
  const client = useApolloClient()

  const [googleLogin] = useGoogle_LoginMutation({
    onError: (error) => {
      console.log(error)
      // @ts-ignore
      if (error.networkError.result?.errors.length) {
        // @ts-ignore
        setError(error.networkError.result?.errors[0].message)
      }
      if (error.graphQLErrors.length) {
        setError(error.graphQLErrors[0].message)
      }
    },
    onCompleted: (loginData) => {
      if (loginData?.loginWithGoogle) {
        const { accessToken } = loginData.loginWithGoogle
        setAccessToken(accessToken || '')
        Router.push(successPath)
      }
    },
    update: (cache, { data }) => {
      if (!data?.loginWithGoogle?.user) {
        return null
      }
      cache.writeQuery({
        query: ME_QUERY,
        data: { me: { __typename: 'User', ...data.loginWithGoogle.user } },
      })
    },
  })

  function onGoogleSuccess(response) {
    if (response.profileObj && response.tokenId) {
      const { profileObj, tokenId: token } = response
      const { givenName: firstName, familyName: lastName, ...newUser } = profileObj
      const user = { ...newUser, firstName, lastName }
      client.writeQuery({
        query: ME_QUERY,
        data: { me: { __typename: 'User', id: 'tempSocialLogin', ...user } },
      })

      googleLogin({ variables: { token } })
    }
  }

  function onFailure(error) {
    console.log(error)
    setGoogleError(error.message)
  }

  return (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
      buttonText="Login"
      onSuccess={onGoogleSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <LoginButton onClick={renderProps.onClick} style={{ height: 40 }}>
          <span>Continue with Google</span>
        </LoginButton>
      )}
    />
  )
}
