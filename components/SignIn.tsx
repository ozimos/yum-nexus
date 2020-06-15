import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useZodValidationResolver } from '../lib/zodValidationResolver'
import NextLink from './NextLink'
import { setAccessToken } from '../lib/accessToken'
import { useLoginMutation, UserFragmentDoc } from '../generated/graphql'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
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

export default function SignIn() {
  const classes = useStyles()
  const validationResolver = useZodValidationResolver(validationSchema)
  const { register, handleSubmit, errors } = useForm<Inputs>({
    validationResolver,
  })
  const [login] = useLoginMutation({
    onCompleted: (loginData) => {
      if (loginData?.login?.accessToken) {
        const { accessToken } = loginData.login
        setAccessToken(accessToken)

        Router.push('/meals')
      }
    },
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
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
            disabled={Object.keys(errors).length !== 0}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                <a>Forgot password?</a>
              </Link>
            </Grid>
            <Grid item>
              <Link component={NextLink} href="/signup" variant="body2">
                <a>Don&apos;t have an account? Sign Up</a>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
