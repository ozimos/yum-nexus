import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from 'next/link'
import Container from '@material-ui/core/Container'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Head from 'next/head'
import FooterSmall from './FooterSmall'
import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    minWidth: '100vh',
    display: 'flex',
    flexDirection: 'column',
    '&>*': {
      flex: '0 0 auto',
    },
  },
  contentBackground: {
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: 'auto'
  },
  content: {
    margin: theme.spacing(1, 'auto'),
    padding: theme.spacing(2, 5, 3),
    borderRadius: 10,
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: { width: '100%' },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  divider: {
    display: 'flex',
    width: '100%',
    margin: theme.spacing(2, 0, 2, 0),
    flexWrap: 'nowrap',
    alignItems: 'center',
    '& > hr': {
      flexGrow: 1,
    },
  },
  spacer: {
    flex: '1 0 auto',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  dividerText: {
    margin: theme.spacing(0, 2),
  },
}))

interface LayoutProps {
  children?: any
  title?: string
}
export default function AuthLayout({ children, title }: LayoutProps) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
     <Head>
        <title>{title || 'My page'}</title>
      </Head>
      <AppBar position="relative" className={classes.appbar}>
        <Toolbar>
          <Link href="/">
            <CameraIcon className={classes.icon} />
          </Link>
          <div className={classes.spacer}></div>
        </Toolbar>
      </AppBar>
    <Container className={classes.contentBackground}>
     
      <Container component="main" maxWidth="xs" className={classes.content}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <FacebookLoginButton />
          <GoogleLoginButton />
          <div className={classes.divider}>
            <Divider />
            <Typography component="span" variant="body1" className={classes.dividerText}>
              {'or'}
            </Typography>
            <Divider />
          </div>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          {children}
        </div>
        <FooterSmall mt={4} />
      </Container>
    </Container>
    </div>
  )
}
