'use strict'

const data = require('../controllers/data')
const healthcheck = require('../controllers/healthcheck')

module.exports = function(app) {
  app.route('/v1/bug')
    .post(data.insert)
    .get(data.retrieve)

    app.route('/health-check')
    .get(healthcheck)
}
