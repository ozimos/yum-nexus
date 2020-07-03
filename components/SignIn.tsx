import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import Link from 'next/link'
import MaterialLink from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useZodValidationResolver } from '../lib/zodValidationResolver'
import { setAccessToken } from '../lib/accessToken'
import { useLoginMutation, UserFragmentDoc } from '../generated/graphql'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
type Inputs = z.infer<typeof validationSchema>
interface ServerError {
  name: string
  type: string
  message: string
}
export default function SignIn() {
  const classes = useStyles()
  const resolver = useZodValidationResolver(validationSchema)
  const { register, handleSubmit, errors, setError } = useForm<Inputs>({
    // @ts-ignore
    resolver,
  })
  const [general, setGeneral] = useState<string[]>([])
  const [login] = useLoginMutation({
    onCompleted: (loginData) => {
      if (loginData?.login?.accessToken) {
        const { accessToken } = loginData.login
        setAccessToken(accessToken)

        Router.push('/meals')
      }
    },
    errorPolicy: 'all',
    onError: (error) =>
    // @ts-ignore
      error.networkError?.result?.data?.errors.forEach(({ name, message, type }: ServerError) => {
        if (name === 'general') {
          setGeneral((prev) => [...prev, message])
        } else {
          setError(name as 'email' | 'password', {type, message})
        }
      }),
  })
  const onSubmit = async (variables: Inputs) => {
    login({
      variables,
      update: (cache, { data }) => {
        if (data?.login?.user) {
          const { user } = data.login
          cache.writeFragment({
            id: `User:${user.id}`,
            fragment: UserFragmentDoc,
            data: { __typename: 'User', ...user },
          })
        }
      },
    })
  }

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      {general.map((errorItem, index) => (
        <FormControl error={Boolean(errorItem)} key={index} fullWidth margin="normal">
          <FormHelperText id="component-error-text">{errorItem}</FormHelperText>
        </FormControl>
      ))}

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        onChange={(e) => setGeneral([])}
        autoComplete="email"
        autoFocus
        inputRef={register({ required: true })}
        error={Boolean(errors?.email)}
        helperText={errors?.email?.message}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => setGeneral([])}
        inputRef={register({ required: true })}
        error={Boolean(errors?.password)}
        helperText={errors?.password?.message}
      />
      <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={Object.keys(errors).length !== 0 || general.length !== 0}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <MaterialLink href="#" variant="body2">
            Forgot password?
          </MaterialLink>
        </Grid>
        <Grid item>
          <Link passHref href="/signup">
            <MaterialLink variant="body2">Don&apos;t have an account? Sign Up</MaterialLink>
          </Link>
        </Grid>
      </Grid>
    </form>
  )
}
