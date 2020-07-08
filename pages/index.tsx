import Button from '@material-ui/core/Button'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { initializeApollo, fetchServerAccessToken } from '../apollo/apolloClient'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import merge from 'lodash/merge'
import { TODAY_MEALS } from '../graphql/meal.query'
import ME from '../graphql/me.query'
import { getTodayMenuVariables } from '../components/Album'
import Layout from '../components/Layout'
import convertToCacheFormat from '../apollo/convertToCache'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: '100% 100%',
    fontSize: 0,
    lineHeight: 0,
  },
  contentBox: {
    backgroundColor: 'white',
    width: '50%',
    margin: 'auto',
    borderRadius: 10,
  },

  contentHead: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.16)',
    padding: '5px',
    color: 'black',
    '& span': {
      color: 'lawngreen',
    },
  },
  contentMain: {
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentBtn: {
    // color: theme.palette.success.contrastText,
    // backgroundColor: theme.palette.success.main,
  },
  '@media (min-width: 420px)': {
    contentBox: {
      width: '350px',
    },
  },
}))

export function IndexPage() {
  const classes = useStyles()

  return (
    <Layout>
      <Container className={classes.container}>
        <div className={classes.contentBox}>
          <div className={classes.contentHead}>
            <Typography variant="h4" color="textSecondary" align="center">
              <span>Yum</span>Meals
            </Typography>
          </div>
          <div className={classes.contentMain}>
            <Link href="/meals" as="/meals">
              <Button className={classes.contentBtn} color="primary" variant="contained">
                Start Ordering
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const serverAccessToken = await fetchServerAccessToken(context)
  // const apolloClient = initializeApollo(null, serverAccessToken)

  // await apolloClient.query({
  //   query: TODAY_MEALS,
  //   variables: getTodayMenuVariables(),
  // })

  // if (serverAccessToken) {
  //   await apolloClient.query({
  //     query: ME,
  //   })
  // }

  const serverExec = require('../nexus/serverExec').default
  const input = { queryDocument: TODAY_MEALS, variables: getTodayMenuVariables() }
  const TODAY_MEALS_result = await serverExec(input, context)
  let ME_result = {}

  if (serverAccessToken) {
    ME_result = await serverExec({ queryDocument: ME }, context)
  }

  return {
    props: {
      initialApolloState: convertToCacheFormat(merge(TODAY_MEALS_result, ME_result)),
      // initialApolloState: apolloClient.cache.extract(),
      unstable_revalidate: 1,
      serverAccessToken,
    },
  }
}

export default IndexPage
