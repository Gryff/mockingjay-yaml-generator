const request = require('request-promise')

module.exports = realDataClient

function realDataClient (baseUrl) {
  return {
    getRealData
  }

  function getRealData (uris) {
    return Promise
      .all(uris.map(uri => request(`${baseUrl}${uri}`)))
      .then(datas => datas.map(JSON.parse))
  }
}
