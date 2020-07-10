if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

const app = require('nexus').default

require('./graphql')

try {
  app.assemble()
} catch {}
module.exports = app.server.handlers.graphql
