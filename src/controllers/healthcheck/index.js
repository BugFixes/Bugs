'use strict'

const bugFunctions = require('bugfixes/functions')

module.exports = function(req, res) {
  return res.json(bugFunctions.result(200, 'Passed'))
}
