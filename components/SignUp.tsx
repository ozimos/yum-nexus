import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Router from 'next/router'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useZodValidationResolver } from '../lib/zodValidationResolver'
import NextLink from './NextLink'
import { setAccessToken } from '../lib/accessToken'
import { useSignupMutation, UserFragmentDoc } from '../generated/graphql'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Yum Meals
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const validationSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, 'Both password and confirmation must match')

type Inputs = z.infer<typeof validationSchema>

export default function SignUp() {
  const classes = useStyles()
  const validationResolver = useZodValidationResolver(validationSchema)
  const { register, handleSubmit, errors } = useForm<Inputs>({
    validationResolver,
  })
  const [signup] = useSignupMutation({
    onCompleted: (signupData) => {
      if (signupData?.signup?.accessToken) {
        const { accessToken } = signupData.signup
        setAccessToken(accessToken)

        Router.push('/meals')
      }
    },
  })
  const onSubmit = (variables: Inputs) => {
    signup({
      variables,
      update: (cache, { data }) => {
        if (data?.signup?.user) {
          const { user } = data.signup
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef={register}
                error={Boolean(errors?.firstName)}
                helperText={errors?.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={register}
                error={Boolean(errors?.lastName)}
                helperText={errors?.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({ required: true })}
                error={Boolean(errors?.email)}
                helperText={errors?.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm your Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                inputRef={register({ required: true })}
                error={Boolean(errors?.confirmPassword)}
                helperText={errors?.confirmPassword?.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={Object.keys(errors).length !== 0}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={NextLink} href="/signin" variant="body2">
                <a>Already have an account? Sign in</a>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
