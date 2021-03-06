import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from 'next/link'
import MaterialLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Router from 'next/router'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import Copyright from './Copyright'
import * as z from 'zod'
import { useZodValidationResolver } from '../lib/zodValidationResolver'
import { setAccessToken } from '../lib/accessToken'
import { useLoginMutation, UserFragmentDoc } from '../generated/graphql'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

export default function SignInSide() {
  const classes = useStyles()
  const resolver = useZodValidationResolver(validationSchema)
  const { register, handleSubmit, errors } = useForm<Inputs>({
    // @ts-ignore
    resolver,
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
