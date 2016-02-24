import {expect} from 'chai'
require('isomorphic-fetch')

describe('Lob API ', () => {
  require('../server')

  describe('Lob API wrapper with data', () => {
    it('handles error when there is a missing variable for required parameters', () => {
      let model = {
        title: 'CA State Senate District 11',
        from_address: {
          line1: '745 Gough St',
          line2: 'Apt A',
          city: 'San Francisco',
          state: 'CA',
          zip: '94102'
        },
        name: 'Mark Leno',
        address: {
          line1: 'State Capitol Room 5100',
          line2: 'Room 5100',
          city: 'Sacramento',
          state: 'CA',
          zip: '95814'
        },
        msg: 'Hello World'
      }

      var fetchLetterToLob = require('../server/fetchLetterToLob')(model)
      expect(fetchLetterToLob.status).to.equal(422)
    })
    it('successfully sends a letter via Lob', () => {
      let model = {
        title: 'CA State Senate District 11',
        from_name: 'SeungJu Lee',
        from_address: {
          line1: '745 Gough St',
          line2: 'Apt A',
          city: 'San Francisco',
          state: 'CA',
          zip: '94102'
        },
        name: 'Mark Leno',
        address: {
          line1: 'State Capitol Room 5100',
          line2: 'Room 5100',
          city: 'Sacramento',
          state: 'CA',
          zip: '95814'
        },
        msg: 'Hello World'
      }
      require('../server/fetchLetterToLob')(model)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        expect(res.status).to.equal(200)
      })
    })
  })
})
