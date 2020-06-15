import { createTestContext as originalCreateTestContext, TestContext } from 'nexus/testing'

export function createTestContext(): TestContext {
  let ctx = {} as TestContext

  beforeAll(async () => {
    Object.assign(ctx, await originalCreateTestContext())

    await ctx.app.server.start()
    // @ts-ignore
    // await ctx.app.db.client.user.create({
    //   data: {
    //     firstName: 'Tyson',
    //     lastName: 'Fury',
    //     email: 'tyson@fury.com',
    //     password: 'somerandompassword',
    //     role: 'ADMIN',
    //   },
    // })
  })

  afterAll(async () => {
    await ctx.app.server.stop()
    // @ts-ignore
    // await ctx.app.db.client.disconnect()
  })

  return ctx
}
