const request = require('request-promise')

module.exports = getMockingjayRequests

function getMockingjayRequests (mockingjayUrl) {
  return request(`${mockingjayUrl}/requests`)
    .then(JSON.parse)
    .catch(err => {
      err.message = `Error getting mockingjay requests:\n${err.message}`
      throw err
    })
}