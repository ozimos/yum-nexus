import { schema } from 'nexus'
import { extractTokenPayload } from '../utils/helpers'
import { adjustUserInputPlugin } from './plugins'

schema.addToContext(extractTokenPayload)

// @ts-ignore
schema.use(adjustUserInputPlugin)
