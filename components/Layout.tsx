import React from 'react'
import Head from 'next/head'
import AppBar from '@material-ui/core/AppBar'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
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
}
export default function Layout({ children, home = false, title }: LayoutProps) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Head>
        <title>{title || 'My page'}</title>
      </Head>
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <div className={classes.spacer}></div>
          <AuthBar />
        </Toolbar>
      </AppBar>
      <main id="main-content" className={classes.main}>
        {children}
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
    </div>
  )
}
