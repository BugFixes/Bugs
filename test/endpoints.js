/* global describe, it, beforeEach */
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
  beforeEach((done) => {
    const data = new DataLayer()
    data.removeAll()

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

  describe('/POST bug', () => {
    it('it should insert a bug', (done) => {
      const payLoad = {
        logLevel: BugFixes.LOG,
        payLoad: 'Test Data',
        accountId: process.env.TEST_ACCOUNT_ID,
        applicationId: process.env.TEST_APPLICATION_ID
      }

      chai.request(server)
        .post('/v1/bug')
        .set('X-API-KEY', process.env.BUGS_KEY)
        .set('X-API-SECRET', process.env.BUGS_SECRET)
        .send(payLoad)
        // .end((err, res) => {
        //   if (err) {
        //     BugFixes.error(err)

        //     done(Error(err))
        //   }

        //   res.should.have.status(200)
        //   done()
        // })

      done()
    })
  })

  describe('/GET bug', () => {
    it('it should return all bugs', (done) => {
      chai.request(server)
        .get('/v1/bug')
        .end((err, res) => {
          if (err) {
            BugFixes.error(err)

            done(Error(err))
          }

          res.should.have.status(200)
          res.body.should.be.an('array')
          res.body.length.should.be.eql(0)

          done()
        })
    })

    it('it should get single bug', (done) => {
      const Data = new DataLayer()
      Data.accountId = process.env.TEST_ACCOUNT_ID
      Data.logLevel = BugFixes.LOG
      Data.payLoad = 'Test Data'
      Data.applicationId = process.env.TEST_APPLICATION_ID
      Data.insert((err, dataId) => {
        if (err) {
          return done(Error(err))
        }

        chai.request(server)
          .get('/v1/bug/' + dataId)
          .end((err, res) => {
            if (err) {
              BugFixes.error(err)

              return done(Error(err))
            }

            res.should.have.status(200)
            // res.body.should.be.an('object')
            // res.body.length.should.be.at.least(1)

            return done()
          })
      })
    })
  })
})
