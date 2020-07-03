import { schema, use, settings } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import permissions from './permissions'
import { extractTokenPayload } from '../utils/helpers'

// @ts-ignore
schema.addToContext(extractTokenPayload)
use(permissions)
use(
  prisma({
    features: {
      crud: true,
    },
  })
)

settings.change({
  schema: {
    generateGraphQLSDLFile: './nexus/public/schema.graphql',
  },
})
