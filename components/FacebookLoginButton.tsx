import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useState } from 'react'
import { FacebookLoginButton as LoginButton } from 'react-social-login-buttons'
import Router from 'next/router'
import { useApolloClient } from '@apollo/client'
import { setAccessToken } from '../lib/accessToken'
import { useFacebook_LoginMutation } from '../generated/graphql'
import ME_QUERY from '../graphql/me.query'

interface FacebookLoginProps {
  successPath?: string
}
export default function FacebookLoginButton({ successPath = '/meals' }: FacebookLoginProps) {
  const [facebookLoginError, setFacebookError] = useState('')
  const [loginError, setError] = useState('')
  const client = useApolloClient()

  const [facebookLogin] = useFacebook_LoginMutation({
    onError: (error) => {
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
      if(loginData?.loginWithFaceBook){
        const { accessToken } = loginData.loginWithFaceBook
        setAccessToken(accessToken || '')
        Router.push(successPath)
      }
    },
    update: (_, { data }) => {
      if (!data?.loginWithFaceBook?.user) {
        return null
      }
      client.writeQuery({
        query: ME_QUERY,
        data: { me: { __typename: 'User', ...data.loginWithFaceBook.user } },
      })
    },
  })

  function responseFacebook(response) {
    const {
      picture,
      email,
      first_name,
      last_name,
      id: facebookId,
      accessToken: token,
      name: fullName,
    } = response
    const splitName = fullName.split(' ')
    const firstName = first_name || splitName[0]
    const lastName = last_name || splitName[1]
    const user = { firstName, lastName, email, picture, facebookId }
    client.writeQuery({
      query: ME_QUERY,
      data: { me: { __typename: 'User', id: 'tempSocialLogin', ...user } },
    })
    facebookLogin({ variables: { token } })
  }

  function onFailure(error) {
    console.log(error)
    setFacebookError(error.message)
  }

  return (
    <FacebookLogin
      appId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}
      version="7.0"
      autoLoad={false}
      fields="name,email,picture,first_name,last_name"
      callback={responseFacebook}
      onFailure={onFailure}
      render={(renderProps) => (
        <LoginButton onClick={renderProps.onClick} style={{ height: 40 }}>
          <span>Continue with Facebook</span>
        </LoginButton>
      )}
    />
  )
}
