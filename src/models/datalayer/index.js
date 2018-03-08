'use strict'

const uuid = require('uuid/v5')
const elasticsearch = require('elasticsearch')
const BugFixes = require('bugfixes')

class DataLayer {
  set accountId(accountId) {
    this._accountId = accountId
  }
  get accountId() {
    return this._accountId
  }

  set logLevel(logLevel) {
    this._logLevel = logLevel
  }
  get logLevel() {
    return this._logLevel
  }

  set payLoad(payLoad) {
    this._payLoad = payLoad
  }
  get payLoad() {
    return this._payLoad
  }

  set applicationId(applicationId) {
    this._applicationId = applicationId
  }
  get applicationId() {
    return this._applicationId
  }

  insert(callback) {
    BugFixes.log("IDs", this.applicationId, this.accountId)

    const indexNamespace = uuid(this.applicationId, this.accountId)
    const insertId = uuid(this.payLoad, indexNamespace)

    BugFixes.log(process.env.ELASTIC_HOST)

    const client = new elasticsearch.Client({
      hosts: [
        process.env.ELASTIC_HOST
      ]
    })
    client.index({
      index: 'bugfixes-' + this.accountId,
      id: insertId,
      type: this.applicationId,
      body: {
        logLevel: this.logLevel,
        insertTime: Date.now(),
        message: this.payLoad
      }
    }, (error, response, status) => {
      if (error) {
        BugFixes.error(error)
        return callback(error)
      }

      return callback(null, insertId)
    })

    return true
  }

  retrieve(params, callback) {
    callback(params)
  }

  removeAll() {
    return true
  }
}

module.exports = DataLayer
