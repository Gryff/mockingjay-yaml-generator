const request = require('request-promise')

module.exports = getMockingjayRequests

function getMockingjayRequests (mockingjayUrl) {
  return request(`${mockingjayUrl}/requests`)
    .then(JSON.parse)
}