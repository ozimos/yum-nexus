import { plugin } from '@nexus/schema'
import permissions from '../permissions'
import { applyMiddleware } from 'graphql-middleware'

export const adjustUserInputPlugin = plugin({
  name: 'shieldPlugin',
  onAfterBuild(schema) {
    applyMiddleware(schema, permissions)
  },
})
