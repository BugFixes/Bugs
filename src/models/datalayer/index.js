'use strict'

const uuid = require('uuid/v5')
const elasticsearch = require('elasticsearch')
const BugFixes = require('bugfixes')
const bugFunctions = require('bugfixes/functions')

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

  get indexNamespace() {
    return uuid(this.applicationId, this.accountId)
  }
  get bugId() {
    return uuid(this.payLoad, this.indexNamespace)
  }

  insert(callback) {
    const client = new elasticsearch.Client({
      hosts: [
        process.env.ELASTIC_HOST
      ]
    })
    client.index({
      index: 'bugfixes-' + this.accountId,
      type: this.accountId,
      id: this.insertId,
      body: {
        logLevel: this.logLevel,
        insertTime: Date.now(),
        message: this.payLoad,
        bugId: this.bugId,
        applicationId: this.applicationId,
        accountId: this.accountId
      }
    }, (error, response, status) => {
      if (error) {
        BugFixes.error(error)

        return callback(error)
      }

      return callback(null, this.bugId)
    })

    return true
  }

  retrieve(bugId, callback) {
    const client = new elasticsearch.Client({
      hosts: [
        process.env.ELASTIC_HOST
      ]
    })
    client.search({
      index: 'bugfixes-' + this.accountId,
      body: {
        query: {
          match: {
            bugId: bugId
          }
        }
      }
    }).then((response) => {
      if (bugFunctions.checkIfDefined(response.hits.hits)) {
        callback(null, response.hits.hits[0]._source)
       } else {
         callback(null, [])
       }
    }, (err) => {
      BugFixes.error(err)

      callback(err)
    })
  }

  retrieveAccount(callback) {
    const client = new elasticsearch.Client({
      hosts: [
        process.env.ELASTIC_HOST
      ]
    })
    client.search({
      index: 'bugfixes-' + this.accountId
    }).then((response) => {
      if (bugFunctions.checkIfDefined(response.hits.hits)) {
        callback(null, response.hits.hits)
      } else {
        callback(null, [])
      }
    }, (err) => {
      BugFixes.error(err)

      callback(err)
    })
  }

  retrieveApplication(callback) {
    const client = new elasticsearch.Client({
      hosts: [
        process.env.ELASTIC_HOST
      ]
    })
    client.search({
      index: 'bugfixes-' + this.accountId,
      body: {
        query: {
          match: {
            applicationId: this.applicationId
          }
        }
      }
    }).then((response) => {
      if (bugFunctions.checkIfDefined(response.hits.hits)) {
        callback(null, response.hits.hits)
      } else {
        callback(null, [])
      }
    }, (err) => {
      BugFixes.error(err)

      callback(err)
    })
  }

  removeAll(callback) {
    const client = new elasticsearch.Client({
      hosts: [
        process.env.ELASTIC_HOST
      ]
    })
    client.deleteByQuery({
      index: 'bugfixes-*',
      q: "*"
    }, (err, resp) => {
      if (err) {
        BugFixes.error(err)

        callback(err)
      }

      callback(null, resp)
    })
  }
}

module.exports = DataLayer
