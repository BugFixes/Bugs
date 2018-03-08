const app = require('express')()
const bodyParser = require('body-parser')

// Parsers
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// Routes
const routes = require('./src/routes')
routes(app)

// Start
const port = process.env.PORT || 3000
app.listen(port)

// BugFixes
const BugFixes = require('bugfixes')
BugFixes.log('Listening on', port)

// Testing
module.exports = app
