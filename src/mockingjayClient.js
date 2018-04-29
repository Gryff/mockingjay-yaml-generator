const request = require('request-promise')

module.exports = mockingjayClient

function mockingjayClient (mockingjayUrl) {
  return {
    getRequests
  }

  function getRequests () {
    return request(`${mockingjayUrl}/requests`)
      .then(JSON.parse)
  }
}