import { schema, use, settings } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import permissions from './permissions'
import { extractTokenPayload } from '../utils/helpers'

// @ts-ignore
schema.addToContext(extractTokenPayload)
use(permissions)
use(prisma())

settings.change({
  schema: {
    generateGraphQLSDLFile: './api/public/schema.graphql',
  },
})
