'use strict'

const data = require('../controllers/data')
const healthcheck = require('../controllers/healthcheck')

module.exports = function(app) {
  app.route('/v1/bug')
    .post(data.insert)
    .delete(data.deleteAll)

  app.route('/v1/bug/:bugId')
    .get(data.retrieve)

  app.route('/v1/bugs/:accountId')
    .get(data.retrieveAllAccount)

  app.route('/v1/bugs/:accountId/:applicationId')
    .get(data.retrieveAllApplication)

    app.route('/health-check')
    .get(healthcheck)

    app.all('*', healthcheck)
}
