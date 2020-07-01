import React from 'react'
import Head from 'next/head'
import AppBar from '@material-ui/core/AppBar'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import Toolbar from '@material-ui/core/Toolbar'
import Copyright from './Copyright'
import AuthBar from './AuthBar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: '100vh',
    alignItems: 'stretch',
    '&>*': {
      flex: '0 0 auto',
    },
  },
  main: {
    display: 'flex',
    flexDirection: props => props.mainFlex,
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: '1 0 auto',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  spacer: {
    flex: '1 0 auto',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(6),
    padding: theme.spacing(3, 2),
  },
}))
export const siteTitle = 'Yum meals'
interface LayoutProps {
  children?: any
  home?: boolean
  title?: string
  mainFlex?: string
}
export default function Layout({ children, home = false, title, mainFlex = 'row' }: LayoutProps) {
  const classes = useStyles({mainFlex})
  return (
    <div className={classes.root}>
      <Head>
        <title>{title || 'My page'}</title>
      </Head>
      <AppBar position="relative">
        <Toolbar>
          <Link href="/">
          <CameraIcon className={classes.icon} />
          </Link>
          <div className={classes.spacer}></div>
          <AuthBar />
        </Toolbar>
      </AppBar>
      <main id="main-content" className={classes.main}>
        {children}
      </main>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
    </div>
  )
}
