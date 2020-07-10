import React, { MouseEvent, useState } from 'react'
import Head from 'next/head'
import AppBar from '@material-ui/core/AppBar'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import grey from '@material-ui/core/colors/grey'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import Badge from '@material-ui/core/Badge'
import Copyright from './Copyright'
import AuthBar from './AuthBar'
import Cart from './Cart'
import { useCartQuery } from '../generated/graphql'

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
  quantityButton: {
    // backgroundColor: theme.palette.button.main,
    color: theme.palette.warning.main,
    '&:hover': {
      color: theme.palette.warning.light,
      // backgroundColor: theme.palette.button.dark,
    },
  },
  main: {
    display: 'flex',
    flexDirection: (props: any) => props.mainFlex,
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: '1 0 auto',
  },
  icon: {
    // marginRight: theme.spacing(2),
    color: 'white',
    '&:hover': {
      color: grey[50],
      // backgroundColor: theme.palette.button.dark,
    },
  },
  spacer: {
    flex: '1 0 auto',
  },
  cartDrawer: {
    width: 250,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(6),
    padding: theme.spacing(3, 2),
  },
  badge: {
    '& span.MuiBadge-colorPrimary': {
      backgroundColor: theme.palette.error.main,
    },
  },
}))
export const siteTitle = 'Yum meals'
interface LayoutProps {
  children?: any
  home?: boolean
  title?: string
  mainFlex?: string
  anchor?: 'bottom' | 'left' | 'right' | 'top' | undefined
}
export default function Layout({
  children,
  home = false,
  title,
  mainFlex = 'row',
  anchor = 'right',
}: LayoutProps) {
  const classes = useStyles({ mainFlex })
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const toggleDrawer = (drawerState: boolean) => (event: MouseEvent) => {
    setDrawerOpen(drawerState)
  }
  const { data } = useCartQuery()
  let meals: any[] = []
  if (data?.cart?.meals) {
    ;({ meals } = data.cart)
  }
  const noOfMeals = meals.length
  return (
    <div className={classes.root}>
      <Head>
        <title>{title || 'My page'}</title>
      </Head>
      <AppBar position="relative">
        <Toolbar>
          <Link href="/">
            <IconButton aria-label="site logo" className={classes.icon} size="small">
              <CameraIcon />
            </IconButton>
          </Link>
          <div className={classes.spacer}></div>
          {!home && (
            <>
              <Badge badgeContent={noOfMeals} color="primary" max={10} className={classes.badge}>
                <IconButton
                  aria-label="shopping cart"
                  className={classes.quantityButton}
                  size="small"
                  onClick={toggleDrawer(true)}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </Badge>
              <Drawer anchor={anchor} open={drawerOpen} onClose={toggleDrawer(false)}>
                <div className={classes.cartDrawer} role="presentation">
                  <Cart meals={meals} />
                </div>
              </Drawer>
            </>
          )}
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
