const request = require('request-promise')

module.exports = getRealData

function getRealData (baseUrl, uris) {
  return Promise
    .all(uris.map(uri => request(`${baseUrl}${uri}`)))
    .then(datas => datas.map(JSON.parse))
}
