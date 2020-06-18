import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { initializeApollo } from '../lib/apolloClient'
import Album, { getTodayMenuVariables } from '../components/Album'
import { TODAY_MEALS } from '../graphql/meal.query'
// if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

// const app = require('nexus').default

// require('../api/graphql')

// app.assemble()

export default Album

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: TODAY_MEALS,
    variables: getTodayMenuVariables(),
  })
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

  const res: { body?: string } = {}
  // const response = await app.server.handlers.graphql(req, res)
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      unstable_revalidate: 1,
      // data: res.body,
    },
  }
}
