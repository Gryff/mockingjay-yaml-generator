const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)

const mockingjayClient = require('./mockingjayClient')
const realDataClient = require('./realDataClient')
const requestToYaml = require('./requestToYaml')

module.exports = mockingjayYamlGenerator

function mockingjayYamlGenerator (mockingjayUrl, realServiceUrl, outputFilePath) {
  return mockingjayClient(mockingjayUrl).getRequests()
    .then(requests => {
      return realDataClient(realServiceUrl)
        .getRealData(requests.map(r => r.URI))
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
    .catch(err => console.error(err))
}


function zipArrays ([one, two]) {
  return one.map((x, i) => ([x, two[i]]))
}
