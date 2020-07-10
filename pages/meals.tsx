import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { initializeApollo, fetchServerAccessToken } from '../apollo/apolloClient'
import Album from '../components/Album'
import { PROJECTED_MEALS } from '../graphql/meal.query'
import Layout from '../components/Layout'
import ME from '../graphql/me.query'

const AllTodayMeals = () => (
  <Layout mainFlex="column">
    <Album />
  </Layout>
)
export default AllTodayMeals

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const serverAccessToken = await fetchServerAccessToken(context)

  const apolloClient = initializeApollo(null, serverAccessToken, context)
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

  return {
    props: {
      initialApolloState,
      unstable_revalidate: 1,
      serverAccessToken,
    },
  }
}
