import { GetStaticProps } from 'next'
import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList, { ALL_POSTS_QUERY, allPostsQueryVars } from '../components/PostList'
import { initializeApollo } from '../apollo/apolloClient'

const IndexPage = () => (
  <App>
    <Header />
    <InfoBox>
      <span role="img" aria-label="icon">
        ℹ️
      </span>
      This page shows how to use SSG with Apollo.
    </InfoBox>
    <Submit />
    <PostList />
  </App>
)

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  }
}

export default IndexPage
