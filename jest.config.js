const { join } = require('path')

module.exports = {
  rootDir: 'tests',
  testEnvironment: join(__dirname, 'nexus-test-environment.js'),
  forceExit: true,
}
