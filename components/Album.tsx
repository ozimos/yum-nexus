import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import endOfToday from 'date-fns/endOfToday'
import startOfToday from 'date-fns/startOfToday'
import ErrorMessage from './ErrorMessage'
import { NetworkStatus } from '@apollo/client'
import { MORE_TODAY_MEALS, MORE_PROJECTED_MEALS } from '../graphql/meal.query'
import {
  useTodayMealsQuery,
  TodayMealsQueryHookResult,
  useProjectedMealsQuery,
  ProjectedMealsQueryHookResult,
} from '../generated/graphql'
import Meal from './Meal'

export const getTodayMenuVariables = (limit = 6) => ({
  startOfToday: startOfToday().toISOString(),
  endOfToday: endOfToday().toISOString(),
  limit,
})

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}))

export default function Album() {
  const classes = useStyles()
  const [cursor, setCursor] = useState('')
  const variables = { limit: 6 }
  // const { loading, error, data, fetchMore, networkStatus } = useTodayMealsQuery({
  const { loading, error, data, fetchMore, networkStatus } = useProjectedMealsQuery({
    variables,
    notifyOnNetworkStatusChange: true,
  })
  useEffect(() => {
    if (data?.menuMeals?.length) {
      setCursor(data?.menuMeals.slice(-1)[0].id)
    } else {
      setCursor('')
    }
  }, [data])
  const loadMoreMeals = () => {
    // @ts-ignore
    fetchMore({
      // query: MORE_TODAY_MEALS,
      query: MORE_PROJECTED_MEALS,
      variables: { cursor, ...variables },
      // updateQuery: (previousResult: TodayMealsQueryHookResult['data'], { fetchMoreResult }) => {
      updateQuery: (previousResult: ProjectedMealsQueryHookResult['data'], { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        if (previousResult?.menuMeals) {
          return Object.assign({}, previousResult, {
            // Append the new posts results to the old one
            menuMeals: [...previousResult.menuMeals, ...fetchMoreResult.menuMeals],
          })
        }
        return fetchMoreResult
      },
    })
  }

  const loadingMoreMeals = networkStatus === NetworkStatus.fetchMore
  if (error) return <ErrorMessage message="Error loading posts." />
  if ((loading || !data) && !loadingMoreMeals) return <div>Loading</div>

  const areMoreMeals = Boolean(cursor)
  return (
    <>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Meals
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          We have a wide selection of meals for you to order from. Browse our catalog
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
      </div>
      {/* End hero unit */}
      <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={4}>
          {data?.menuMeals ? (
            data.menuMeals.map(({ id, title, description, price, imageUrl, cartStatus }) => {
              const props = { id, title, description, price, imageUrl, cartStatus }
              return <Meal key={id} {...props} />
            })
          ) : (
            <div>Loading</div>
          )}
        </Grid>
        {areMoreMeals && (
          <Button size="small" color="primary" onClick={() => loadMoreMeals()} disabled={loadingMoreMeals}>
            {loadingMoreMeals ? 'Loading...' : 'Show More'}
          </Button>
        )}
      </Container>
    </>
  )
}
