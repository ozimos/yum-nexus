import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import merge from 'lodash/merge'
import { initializeApollo, fetchServerAccessToken } from '../apollo/apolloClient'
import Album from '../components/Album'
import { PROJECTED_MEALS } from '../graphql/meal.query'
import Layout from '../components/Layout'
import convertToCacheFormat from '../apollo/convertToCache'
import ME from '../graphql/me.query'

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
  })
  if (serverAccessToken) {
    await apolloClient.query({
      query: ME,
    })
  }
  const initialApolloState = apolloClient.cache.extract()

  // const serverExec = require('../nexus/serverExec').default
  // const input = { queryDocument: PROJECTED_MEALS, variables: { limit: 6 } }
  // const PROJECTED_MEALS_result = await serverExec(input, context)
  // let ME_result = {}

  // if (serverAccessToken) {
  //   ME_result = await serverExec({ queryDocument: ME }, context)
  // }
  // const initialApolloState = convertToCacheFormat(merge(PROJECTED_MEALS_result, ME_result))

  console.log('serverAccessToken', serverAccessToken)
  console.log('initialApolloState')
  console.dir(initialApolloState)
  return {
    props: {
      initialApolloState,
      unstable_revalidate: 1,
      serverAccessToken,
    },
  }
}
