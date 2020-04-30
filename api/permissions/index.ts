import { shield, or } from 'graphql-shield'
import rules from './rules';

import { roles } from '../utils/constants'
const { USER, ADMIN } = roles
const {
  isAuthenticated,
  hasValidRoles,
  canEditOnlyOwnRecord,
  canViewOnlyOwnRecord,
} = rules


const defaultViewRule = or(hasValidRoles([ADMIN]), canViewOnlyOwnRecord)

const defaultEditRule = or(hasValidRoles([ADMIN]), canEditOnlyOwnRecord)

const adminRule = hasValidRoles([ADMIN])

export default shield(
    {
        Query: {
            me: isAuthenticated,
            meal: isAuthenticated,
            users: defaultViewRule
        },
        Mutation: {
            createOneMeal: isAuthenticated,
            deleteOneMeal: defaultEditRule,
        },
    },
    { allowExternalErrors: true, debug: true },
);
