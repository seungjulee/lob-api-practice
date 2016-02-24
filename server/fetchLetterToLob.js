'use strict'
const credential = require('./config/credential.json')
/*
 *  Given the information about the receipient and sender,
 *  send a letter to the given receipient using a Lob Letter API.
 *  - Letter from is used from './forms/letterTemplate.html'
 *  - Credential for Lob API is at './config/credential.json'
 *  @func
 *  @param {Object} req - the receipient and sender information
 */
module.exports = function(req) {
  /*
   * Initialize Lob object with test credential
   */
  var fs = require('fs')
  var Lob = require('lob')(credential['lob_key'])
  var file = fs.readFileSync(__dirname + '/forms/letterTemplate.html').toString()

  /*
   * Initialize output object
   */
  var response = {'status': null, 'msg': null}
  const address = req['address']
  const fromAddress = req['from_address']

  // Check if the passed parameter is vaild
  if (req['address'] == undefined || req['name'] == undefined
      || req['title'] == undefined || req['msg'] == undefined
    || req['from_address'] == undefined || req['from_name'] == undefined){
    response['status'] = 422
    response['msg'] = "Error from Lob: Missing Required Input: address, name, title or message is not provided!"
    return response
  }

  /*
   * Initialize Lob API object
   */
  return Lob.addresses.create({
    name: req['title']+" "+req['name'],
    address_line1: address['line1'],
    address_line2: address['line2'],
    address_city: address['city'],
    address_state: address['state'],
    address_zip: address['zip'],
    address_country: 'US'
  })
  .then(function (address) {
    return Lob.letters.create({
      description: 'Letter to ' + req['name'],
      to: address.id,
      from: {
        name: req['from_name'],
        address_line1: fromAddress['line1'],
        address_line2: fromAddress['line2'],
        address_city: fromAddress['city'],
        address_state: fromAddress['state'],
        address_zip: fromAddress['zip'],
        address_country: 'US'
      },
      file: file,
      data: {
        name: req['name'],
        from_name: req['from_name'],
        msg: req['msg'],
        title: req['title']
      },
      color: false
    })
  })
  .then(function (letter) {
    response['status'] = 200
    response['msg'] = `Success from Lob API: the letter was successfully sent to ${req['title']} ${req['name']}!`
    return response
  })
  .catch(function (err) {
    response['status'] = 400
    response['msg'] = 'Error from Lob API: ' + err
    return response
  })
}
