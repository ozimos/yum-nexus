const { Client } = require('pg')
const { debuglog } = require('util')
const { getDatabaseConnection } = require('./base')

const log = debuglog('app')

async function drop() {
  const { safeConnectionString, schema } = getDatabaseConnection()

  try {
    const client = new Client({
      connectionString: safeConnectionString,
    })
    await client.connect()
    const output = await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
    log(output)
    await client.end()
  } catch (error) {
    log(error)
  }
}

drop()
