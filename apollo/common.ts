export const isServer = () => typeof window === 'undefined'
export const graphPath = '/api/graphql'
export const fallbackURL = `${process.env.NEXT_PUBLIC_YUM_SERVER_URL}${graphPath}`
export const getServerURL = (path) =>
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}${path}` : fallbackURL
export const getClientURL = (path) =>
  `${window.location.protocol}://${window.location.host}${path}` || fallbackURL
export const getRemoteURL = (path: string) => (isServer() ? getServerURL(path) : getClientURL(path))
