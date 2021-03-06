const { Client } = require('pg')
const NodeEnvironment = require('jest-environment-node')
const util = require('util')
const { nanoid } = require('nanoid')
const exec = util.promisify(require('child_process').exec)
const prismaBinary = './node_modules/.bin/prisma'
const { config } = require('dotenv')

config()
/**
 * Custom test environment for nexus and Postgres
 */
class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
    // Generate a unique schema identifier for this test context
    this.schema = `test_${nanoid()}`
    // Generate the pg connection string for the test schema
    this.connectionString = `${process.env.TEST_DATABASE_URL}?schema=${this.schema}`
  }

  async setup() {
    // Set the required environment variable to contain the connection string
    // to our database test schema
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString

    // Run the migrations to ensure our schema has the required structure
    await exec(`${prismaBinary} migrate up --experimental`)

    return super.setup()
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    })
    await client.connect()
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)
    await client.end()
  }
}

module.exports = PrismaTestEnvironment
