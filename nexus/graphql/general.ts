import { schema, use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { PrismaClient } from "@prisma/client"
import permissions from './permissions'
import { extractTokenPayload } from '../utils/helpers'

const instance = new PrismaClient({
  
})
// @ts-ignore
schema.addToContext(extractTokenPayload)
use(permissions)
use(
  prisma({
    features: {
      crud: true,
    },
    client: {
      instance,

    },
    
  })
)
