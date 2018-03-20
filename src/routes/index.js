'use strict'

const data = require('../controllers/data')
const healthcheck = require('../controllers/healthcheck')

module.exports = function(app) {
  app.route('/bug')
    .post(data.insert)
    .delete(data.deleteAll)

  app.route('/bug/:bugId')
    .get(data.retrieve)

  app.route('/bugs/:accountId')
    .get(data.retrieveAllAccount)

  app.route('/bugs/:accountId/:applicationId')
    .get(data.retrieveAllApplication)

    app.route('/health-check')
    .get(healthcheck)

    app.all('*', healthcheck)
}
