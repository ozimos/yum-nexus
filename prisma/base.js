const url = require('url')
const { exec } = require('child_process')
const { debuglog } = require('util')

const log = debuglog('app')
function migrate(query) {
  exec(query, (err, stdout) => {
    if (err) {
      log(`exec error: ${err}`)
      return
    }
    log(stdout)
  })
}

function getDatabaseConnection() {
  const connectionString = process.env.DATABASE_URL
  const { schema = 'public' } = url.parse(connectionString, true).query
  return {
    safeConnectionString: connectionString.split('?')[0],
    schema,
    connectionString,
  }
}

function migrateFile(filepath) {
  const { safeConnectionString, schema } = getDatabaseConnection()
  const query = `psql ${safeConnectionString}?options=--search_path%3D${schema} -f ${filepath}`
  migrate(query)
}

module.exports = { getDatabaseConnection, migrateFile }
