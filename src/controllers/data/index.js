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
            BugFixes.error(error)

            return res.json(bugFunctions.error(1002, error))
          }

          return res.json({
            bugId: result
          })
        })
      } else {
        return res.json(bugFunctions.error(1001, 'Invalid Key'))
      }
    } else {
      return res.json(bugFunctions.defaultError(1000))
    }
  },

  retrieve: function(req, res) {
    if (req.headers) {
      if (req.header('x-api-key') === process.env.BUGS_KEY && req.header('x-api-secret') === process.env.BUGS_SECRET) {
        const Data = new DataLayer()
        Data.accountId = req.header('accountId')
        Data.applicationId = req.header('applicationId')
        Data.retrieve(req.params['bugId'], (error, result) => {
          if (error) {
            BugFixes.error(error)

            return res.json(bugFunctions.error(2002, error))
          }

          return res.json(result)
        })
      } else {
        return res.json(bugFunctions.error(2001, 'Invalid Key'))
      }
    } else {
      return res.json(bugFunctions.defaultError(2000))
    }
  },

  retrieveAllAccount: function(req, res) {
    if(req.headers) {
      if (req.header('x-api-key') === process.env.BUGS_KEY && req.header('x-api-secret') === process.env.BUGS_SECRET) {
        const Data = new DataLayer()
        Data.accountId = req.params['accountId']
        Data.retrieveAccount((error, result) => {
          if (error) {
            BugFixes.error(error)

            return res.json(bugFunctions.error(3002, error))
          }

          return res.json(result)
        })
      } else {
        return res.json(bugFunctions.error(3001, 'Invalid Key'))
      }
    } else {
      return res.json(bugFunctions.defaultError(3000))
    }
  },

  retrieveAllApplication: function(req, res) {
    if(req.headers) {
      if (req.header('x-api-key') === process.env.BUGS_KEY && req.header('x-api-secret') === process.env.BUGS_SECRET) {
        const Data = new DataLayer()
        Data.accountId = req.params['accountId']
        Data.applicationId = req.params['applicationId']
        Data.retrieveApplication((error, result) => {
          if (error) {
            BugFixes.error(error)

            return res.json(bugFunctions.error(4002, error))
          }

          return res.json(result)
        })
      } else {
        return res.json(bugFunctions.error(4001, 'Invalid Key'))
      }
    } else {
      return res.json(bugFunctions.defaultError(4000))
    }
  },

  deleteAll: function(req, res) {
    if (req.headers) {
      if (req.header('x-api-key') === process.env.BUGS_KEY && req.header('x-api-secret') === process.env.BUGS_SECRET) {
        const Data = new DataLayer()
        Data.removeAll((error, result) => {
          if (error) {
            BugFixes.error(error)

            return res.json(bugFunctions.error(5002, error))
          }

          return res.json(result)
        })
      } else {
        return res.json(bugFunctions.error(5001, 'Invalid Key'))
      }
    } else {
      return res.json(bugFunctions.defaultError(5000))
    }
  }
}

module.exports = Controller
