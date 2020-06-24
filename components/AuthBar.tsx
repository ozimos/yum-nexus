import Button from '@material-ui/core/Button'
import Link from 'next/link'
import { useApolloClient } from '@apollo/client'
import { useLogoutMutation } from '../generated/graphql'
import { getAccessToken, setAccessToken } from '../lib/accessToken'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 0, 0, 2),
  },
}))

const useLogoutStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.warning.contrastText,
    backgroundColor: theme.palette.warning.main,
    margin: theme.spacing(0, 0, 0, 2),
  },
}))

export function LogoutButton() {
  const [logout] = useLogoutMutation()
  const client = useApolloClient()
  const classes = useLogoutStyles()
  return (
    <Button
      className={classes.root}
      color="secondary"
      variant="contained"
      onClick={async () => {
        setAccessToken('')
        await logout()
        client.clearStore()
        window.location.href = '/'
      }}
    >
      Logout
    </Button>
  )
}

export default function AuthBar() {
  const classes = useStyles()
  return getAccessToken() ? (
    <LogoutButton />
  ) : (
    <>
      <Link href="/signin" as="/signin">
        <Button className={classes.root} color="secondary" variant="contained">
          Sign In
        </Button>
      </Link>

      <Link href="/signup" as="/signup">
        <Button className={classes.root} color="secondary" variant="contained">
          Register
        </Button>
      </Link>
    </>
  )
}
