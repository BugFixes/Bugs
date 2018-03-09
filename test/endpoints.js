/* global describe, it, afterEach */
'use strict'

require('dotenv').config()
const BugFixes = require('bugfixes')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should() // eslint-disable-line

const server = require('../index')
const DataLayer = require('../src/models/datalayer')

chai.use(chaiHttp)

describe('EndPoints', () => {
  afterEach((done) => {
    const data = new DataLayer()
    data.removeAll((error, result) => {
      if (error) {
        BugFixes.error(error)
      }
    })

    done()
  })

  describe('Health Check', () => {
    it('should return healthcheck', (done) => {
      chai.request(server)
        .get('/health-check')
        .end((err, res) => {
          if (err) {
            BugFixes.error(err)

            done(Error(err))
          }

          res.should.have.status(200)

          done()
        })
    })
  })

  describe('NonBreaking Random', () => {
    it('shouldnt crash if random address given', (done) => {
      chai.request(server)
        .get('/' + Date.now())
        .end((err, res) => {
          if (err) {
            BugFixes.error(err)

            done(Error(err))
          }

          done()
        })
    })
  })

  describe('/POST bug', () => {
    it('it should insert a bug', (done) => {
      let insertDate = new Date()
      insertDate = insertDate.toISOString()

      const payLoad = {
        logLevel: BugFixes.LOG,
        payLoad: 'Test Data-' + insertDate,
        accountId: process.env.TEST_ACCOUNT_ID,
        applicationId: process.env.TEST_APPLICATION_ID
      }

      chai.request(server)
        .post('/v1/bug')
        .set('X-API-KEY', process.env.BUGS_KEY)
        .set('X-API-SECRET', process.env.BUGS_SECRET)
        .send(payLoad)
        .end((err, res) => {
          if (err) {
            BugFixes.error(err)

            done(Error(err))
          }

          res.should.have.status(200)
          done()
        })
    })
  })

  describe('/GET bug', () => {
    it('it should return all bugs for account', (done) => {
      chai.request(server)
        .get('/v1/bugs/' + process.env.TEST_ACCOUNT_ID)
        .set('X-API-KEY', process.env.BUGS_KEY)
        .set('X-API-SECRET', process.env.BUGS_SECRET)
        .end((err, res) => {
          if (err) {
            BugFixes.error(err)

            done(Error(err))
          }

          BugFixes.info(res.body)

          res.should.have.status(200)
          res.body.should.be.an('array')

          done()
        })
    })

    it('it should return all bugs for an application', (done) => {
      chai.request(server)
        .get('/v1/bugs/' + process.env.TEST_ACCOUNT_ID + '/' + process.env.TEST_APPLICATION_ID)
        .set('X-API-KEY', process.env.BUGS_KEY)
        .set('X-API-SECRET', process.env.BUGS_SECRET)
        .end((err, res) => {
          if (err) {
            BugFixes.error(err)

            done(Error(err))
          }

          res.should.have.status(200)
          res.body.should.be.an('array')

          done()
        })
    })

    it('it should get single bug', (done) => {
      let insertDate = new Date()
      insertDate = insertDate.toISOString()

      const Data = new DataLayer()
      Data.accountId = process.env.TEST_ACCOUNT_ID
      Data.logLevel = BugFixes.LOG
      Data.payLoad = 'Test Data-' + insertDate
      Data.applicationId = process.env.TEST_APPLICATION_ID
      Data.insert((err, returnId) => {
        if (err) {
          BugFixes.error(err)
        }

        chai.request(server)
          .get('/v1/bug/' + returnId)
          .end((err, res) => {
            if (err) {
              BugFixes.error(err)

              done(Error(err))
            }

            res.should.have.status(200)
            res.body.should.be.an('object')

            done()
          })
      })
    })
  })
})
