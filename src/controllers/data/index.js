'use strict'

const bugFunctions = require('bugfixes/functions')

const Controller = {
  insert: function(req, res) {
    res.json(bugFunctions.result(200, 'Insert'))
  },

  retrieve: function(req, res) {
    res.json(bugFunctions.result(200, 'Retrieve'))
  }
}

module.exports = Controller
