export const isServer = () => typeof window === 'undefined'
export const graphPath = '/api/graphql'
const protocol = process.env.NO_HTTPS ? 'http' : 'https' 
export const getRemoteURL = (path) => `${protocol}://${process.env.VERCEL_URL}${path}`
export const graphQLURL = getRemoteURL(graphPath) 