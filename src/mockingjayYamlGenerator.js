const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)

const getMockingjayRequests = require('./getMockingjayRequests')
const getRealData = require('./getRealData')
const requestToYaml = require('./requestToYaml')

module.exports = mockingjayYamlGenerator

function mockingjayYamlGenerator (mockingjayUrl, realServiceUrl, outputFilePath) {
  return getMockingjayRequests(mockingjayUrl)
    .then(requests => {
      const validRequests = requests
        .filter(isNotFaviconRequest)

      return getRealData(realServiceUrl, validRequests.map(r => r.URI))
        .then(realData => ([realData, validRequests]))
    })
    .then(zipArrays)
    .then(requests => requests.map(([realData, request]) => {
        return requestToYaml({
          request,
          requestName: request.URI,
          response: realData
        })
      }))
    .then(yamls => writeFile(outputFilePath, yamls.join('\n'), 'utf8'))
}

function zipArrays ([one, two]) {
  return one.map((x, i) => ([x, two[i]]))
}

function isNotFaviconRequest (request) {
  return !request.URI.includes('favicon')
}
