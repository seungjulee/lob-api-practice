import {expect} from 'chai'
require('isomorphic-fetch')

describe('apiserver', () => {
  require('../server')
  describe('API ', () => {
    it('can handle error from Google', () => {
      let model = {
        city: 'San Francisco',
        from_name: 'SeungJu Lee',
        levels: 'administrativeArea2',
        line1: '745 Gough St',
        line2: 'Apt A',
        msg: 'Hello World',
        roles: 'legislatorUpperBody',
        state: 'CA',
        zip: '94102'
      }

      fetch('http://127.0.0.1:3000/api', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(model)
      })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
      })
      .catch((err) => {
        expect(err.status).to.equal(400)
      })
    })
    it('can handle error if a required parameter is missing', () => {
      let model = {
        city: 'San Francisco',
        levels: 'administrativeArea2',
        line2: 'Apt A',
        msg: 'Hello World',
        roles: 'legislatorUpperBody',
        state: 'CA',
        zip: '94102'
      }
      fetch('http://127.0.0.1:3000/api', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(model)
      })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
      })
      .catch((err) => {
        console.log(err)
        expect(err.status).to.equal(422)
      })
    })
    it('sends a letter via Lob', () => {
      let model = {
        city: 'San Francisco',
        from_name: 'SeungJu Lee',
        levels: 'administrativeArea1',
        line1: '745 Gough St',
        line2: 'Apt A',
        msg: 'Hello World',
        roles: 'legislatorUpperBody',
        state: 'CA',
        zip: '94102'
      }

      fetch('http://127.0.0.1:3000/api', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(model)
      })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
      })
      .catch((err) => {
        expect(err.status).to.equal(200)
        console.log(err)
      })
    })
  })
})
