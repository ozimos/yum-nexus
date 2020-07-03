import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { initializeApollo, fetchServerAccessToken } from '../apollo/apolloClient'
import Album, { getTodayMenuVariables } from '../components/Album'
import { TODAY_MEALS, PROJECTED_MEALS } from '../graphql/meal.query'
import Layout from '../components/Layout'
import ME from '../graphql/me.query'
// if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

// const app = require('nexus').default

// require('../nexus/graphql')

// app.assemble()
const AllTodayMeals = () => (
  <Layout mainFlex="column">
    <Album />
  </Layout>
)
export default AllTodayMeals

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const serverAccessToken = await fetchServerAccessToken(context)
  const apolloClient = initializeApollo(null, serverAccessToken)

  await apolloClient.query({
    query: PROJECTED_MEALS,
    variables: { limit: 6 },
    // query: TODAY_MEALS,
    // variables: getTodayMenuVariables(),
  })
  if (serverAccessToken) {
    await apolloClient.query({
      query: ME,
    })
  }
  // const req = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     query,
  //     variables,
  //   }),
  // }

  // const res: { body?: string } = {}
  // const response = await app.server.handlers.graphql(req, res)
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      unstable_revalidate: 1,
      serverAccessToken,
      // data: res.body,
    },
  }
}
