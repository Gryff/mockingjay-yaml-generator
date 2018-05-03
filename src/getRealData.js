const request = require('request-promise')

module.exports = getRealData

function getRealData (baseUrl, requests) {
  return Promise
    .all(requests.map(getData))
    .catch(err => {
      err.message = `Error getting real data:\n${err.message}`
      throw err
    })

  function getData (options) {
    return request({
      url: `${baseUrl}${options.URI}`,
      headers: options.Headers,
      json: true
    })
  }
}
