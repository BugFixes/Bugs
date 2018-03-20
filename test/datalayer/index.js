/* global describe, it, afterEach */
'use strict'

require('dotenv').config()
const DataLayer = require('../../src/models/datalayer')

describe('DataLayer', () => {
  afterEach((done) => {
    const data = new DataLayer()
    data.removeAll((error, result) => {
      if (error) {
        done(Error(error))
      }

      done()
    })
  })

  it('Should Insert Data', (done) => {
    done()
  })

  it('Should Get Data', (done) => {
    done()
  })
})
