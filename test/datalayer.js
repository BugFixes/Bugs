/* global describe, it */
'use strict'

const DataLayer = require('../src/models/datalayer')

describe('DataLayer', () => {
  it('Should Insert Data', (done) => {
    const data = new DataLayer()
    data.removeAll()

    done()
  })

  it('Should Get Data', (done) => {
    const data = new DataLayer()
    data.removeAll()

    done()
  })
})
