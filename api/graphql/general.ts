import { schema, use, settings } from 'nexus'
import permissions from './permissions'
import { extractTokenPayload } from '../utils/helpers'

// @ts-ignore
schema.addToContext(extractTokenPayload)

use(permissions)

settings.change({
  schema: {
    generateGraphQLSDLFile: './api/public/schema.graphql',
  },
})
