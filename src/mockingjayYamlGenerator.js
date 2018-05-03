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
      return getRealData(realServiceUrl, requests.map(r => r.URI))
        .then(realData => ([realData, requests]))
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
    .then(() => console.log(`Success, yaml has been outputted to ${outputFilePath}`))
    .catch(err => {
      console.error(err.message)
      process.exit(1)
    })
}


function zipArrays ([one, two]) {
  return one.map((x, i) => ([x, two[i]]))
}
