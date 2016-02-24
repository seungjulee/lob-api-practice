const credential = require('./config/credential')
const queryString = require('query-string')
const request = require('koa-request')

/*
 *  Given a name, address, message and information about local representative, find the address
 *  of the appropirate local representative, and send a letter using Lob API
 *
 *  - Koa Middleware listening to POST request
 *  - POST data format (all required unless stated optional):
 *     line1 {string}, line2 {string} (optional), city {string}, state {string},
 *     zip {string}, includeOffices {boolean}, levels {string}, roles {string}.
 *     from_name {string}, msg {string} (max 500 characters)
 *  - Google Civic API Doc: https://developers.google.com/civic­information/docs/v2/representatives/representativeInfoByAddress
 *  @func
 *  @param {Object} req - the sender's name and address and local official's
 *                        information
 *
 *
 */
module.exports = function * apiserver (next) {
  // Parse POST body
  const params = this.request.body
  var response = {'status': null, 'msg': null}

  // Check if required POST params exist
  if (params['line1'] === undefined || params['city'] === undefined ||
      params['state'] === undefined || params['from_name'] === undefined ||
      params['msg'] === undefined) {
    response['status'] = 422
    response['msg'] = 'Error from API Server: Missing Required Input: address, from_name or message is not provided!'
  } else {
    /*
     * Initialize addresses for Lob and query parameter for Google Civic API
     */

    const fromName = params['from_name']
    const fromAddressQuery = params['line1'] + ',' + params['city'] + ',' + params['state'] + ' ' + params['zip']
    var fromAddressJson = {
      line1: params['line1'],
      line2: params['line2'],
      city: params['city'],
      state: params['state'],
      zip: params['zip']
    }
    const queryParams = {
      'address': fromAddressQuery,
      'includeOffices': true,
      'levels': params['levels'],
      'roles': params['roles'],
      'key': credential['google_key']
    }

    // Convert string to query string
    const parsedParams = queryString.stringify(queryParams)
    const options = {
      url: `https://www.googleapis.com/civicinfo/v2/representatives/?${parsedParams}`
    }

    // Fetch to Google Civic API
    const res = yield request(options)

    // parse result from Google Civic API request response
    const info = JSON.parse(res.body)

    // Parse Errors from Google API
    if (info['error'] !== undefined) {
      this.status = info['error']['code']
      response['status'] = info['error']['code']
      response['msg'] = 'Error from Google API: ' + info['error']['message']
    } else {
    // Parse success from Google API
        // In case if there was no address in the google db
      if (info['officials'] === undefined) {
        response['status'] = 404
        response['msg'] = 'Error from Google API: there is no address for the requested official in Google Civic Database!'
      } else if (info['officials'][0]['address'] === undefined) {
        response['status'] = 404
        response['msg'] = 'Error from Google API: there is no address for the requested official in Google Civic Database!'
      } else {
        const address = info['officials'][0]['address'][0]
        const name = info['officials'][0]['name']
        const title = info['offices'][0]['name']
        const msg = params['msg']
        response['status'] = 200
        response['msg'] = {'address': address, 'name': name, 'title': title,
                              'msg': msg, 'from_address': fromAddressJson, 'from_name': fromName}
        response = yield require('./fetchLetterToLob')(response['msg'])
      }
    }
  }
  // Return JSON object for both success and failed instances
  this.body = response
  yield next
}
