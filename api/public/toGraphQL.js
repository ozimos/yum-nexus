const { buildSchema } = require('graphql')
const path = require('path')
const fs = require('fs')
module.exports = function () {
  const schemaPath = path.resolve(__dirname, './schema.graphql')

  return buildSchema(fs.readFileSync(schemaPath, 'UTF8'))
  // JSON.stringify(buildSchema(fs.readFileSync(schemaPath, 'UTF8')));
}
