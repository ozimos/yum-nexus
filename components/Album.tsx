import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import endOfToday from 'date-fns/endOfToday'
import startOfToday from 'date-fns/startOfToday'
import ErrorMessage from './ErrorMessage'
import { NetworkStatus } from '@apollo/client'
import { MORE_TODAY_MEALS } from '../graphql/meal.query'
import { useTodayMealsQuery, TodayMealsQueryHookResult } from '../generated/graphql'

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

export const getTodayMenuVariables = (limit = 6) => ({
  startOfToday: startOfToday(),
  endOfToday: endOfToday(),
  limit,
})

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

export default function Album() {
  const classes = useStyles()
  const [cursor, setCursor] = useState('')
  const variables = getTodayMenuVariables()
  const { loading, error, data, fetchMore, networkStatus } = useTodayMealsQuery({
    variables,
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    console.dir('data', data)
    if (data?.meals?.length) {
      setCursor(data?.meals.slice(-1)[0].id)
    } else {
      setCursor('')
    }
  }, [data])
  const loadMoreMeals = () => {
    // @ts-ignore
    fetchMore({
      query: MORE_TODAY_MEALS,
      variables: { cursor, ...variables },
      updateQuery: (previousResult: TodayMealsQueryHookResult['data'], { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return Object.assign({}, previousResult, {
          // Append the new posts results to the old one
          meals: [...previousResult.meals, ...fetchMoreResult.meals],
        })
      },
    })
  }

  const loadingMoreMeals = networkStatus === NetworkStatus.fetchMore
  if (error) return <ErrorMessage message="Error loading posts." />
  if ((loading || !data) && !loadingMoreMeals) return <div>Loading</div>

  const areMoreMeals = Boolean(cursor)
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc. Make it
              short and sweet, but not too short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.meals.map(({ id, title, description, price, imageUrl }) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={imageUrl || 'https://source.unsplash.com/random'}
                    title={title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {price}
                    </Typography>
                    <Typography>{description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {areMoreMeals && (
            <Button size="small" color="primary" onClick={() => loadMoreMeals()} disabled={loadingMoreMeals}>
              {loadingMoreMeals ? 'Loading...' : 'Show More'}
            </Button>
          )}
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}
