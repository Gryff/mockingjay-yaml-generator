const yaml = require('js-yaml')

module.exports = requestToYaml

function requestToYaml ({request, requestName, response}) {
  const thing = {
    name: requestName,
    request: {
      uri: request.URI,
      method: request.Method
    },
    response: {
      code: 200,
      body: JSON.stringify(response, null, '  ')
    }
  }

  return yaml.safeDump([thing])
}
