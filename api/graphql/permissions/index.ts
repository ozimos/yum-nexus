import { shield, or } from 'nexus-plugin-shield'
import rules from './rules'

import { Role } from '../../utils/constants'
const { ADMIN } = Role
const {
  isAuthenticated,
  hasValidRoles,
  canEditOnlyOwnRecord,
  canViewOnlyOwnRecord,
} = rules

const defaultViewRule = or(hasValidRoles([ADMIN]), canViewOnlyOwnRecord)

const defaultEditRule = or(hasValidRoles([ADMIN]), canEditOnlyOwnRecord)

const adminRule = hasValidRoles([ADMIN])

export default shield({
  rules: {
    Query: {
      me: isAuthenticated,
      meal: isAuthenticated,
      users: defaultViewRule,
    },
    Mutation: {
      createOneMeal: isAuthenticated,
      deleteOneMeal: defaultEditRule,
    },
  },
  options: { allowExternalErrors: true, debug: true },
})
