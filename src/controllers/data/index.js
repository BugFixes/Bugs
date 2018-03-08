'use strict'

const BugFixes = require('bugfixes')
const bugFunctions = require('bugfixes/functions')
const DataLayer = require('../../models/datalayer')

const Controller = {
  insert: function(req, res) {
    if (req.headers) {
      if (req.header('x-api-key') === process.env.BUGS_KEY && req.header('x-api-secret') === process.env.BUGS_SECRET) {
        const Data = new DataLayer()
        Data.logLevel = req.body.logLevel
        Data.payLoad = req.body.payLoad
        Data.accountId = req.body.accountId
        Data.applicationId = req.body.applicationId
        Data.insert((error, result) => {
          if (error) {
            return res.json(bugFunctions.result(1002, error))
          }

          return res.json(result)
        })
      } else {
        return res.json(bugFunctions.result(1001, 'Invalid Key'))
      }
    } else {
      return res.json(bugFunctions.defaultError(1000))
    }
  },

  retrieve: function(req, res) {
    return res.json([]).status(501)
  },

  retrieveAll: function(req, res) {
    return res.json([]).status(501)
  }
}

module.exports = Controller
