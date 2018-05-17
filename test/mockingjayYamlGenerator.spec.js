import test from 'ava'
import nock from 'nock'
import fs from 'fs'
import util from 'util'
import mockingjayGETRequestBuilder from './helpers/mockingjayGETRequestBuilder'

import mockingjayYamlGenerator from '../src/mockingjayYamlGenerator'

const mockingjayRequests = [
  { URI: '/one', Headers: { 'x-special-header': 'required' } },
  { URI: '/two', Headers: { 'x-special-header': 'required' } },
  { URI: '/three', Headers: { 'x-special-header': 'required' } }
]

const mockingjayRequestsWithDuplicates = [
  { URI: '/one', Headers: { 'x-special-header': 'required' } },
  { URI: '/one', Headers: { 'x-special-header': 'required' } },
  { URI: '/two', Headers: { 'x-special-header': 'required' } },
  { URI: '/two', Headers: { 'x-special-header': 'required' } },
  { URI: '/three', Headers: { 'x-special-header': 'required' } }
]

test('gets requests from a mockingjay server, outputs a yaml file with data', testYamlGenerator, mockingjayRequests, expectedYaml())

test('removes duplicate requests', testYamlGenerator, mockingjayRequestsWithDuplicates, expectedYaml())

const readFile = util.promisify(fs.readFile)

async function testYamlGenerator (t, mockingjayRequests, expectedYaml) {
  const mockingjayUrl = 'http://localhost:9099'
  const realServiceUrl = 'https://real-service.com'
  const outputFileName = 'test-data.yaml'

  nock(mockingjayUrl)
    .get('/requests')
    .reply(200, mockingjayRequests.map(mockingjayGETRequestBuilder))

  mockingjayRequests.forEach(request => {
    nock(realServiceUrl, { reqheaders: request.Headers })
      .get(request.URI)
      .reply(200, fakeData(request.URI))
  })

  await mockingjayYamlGenerator(mockingjayUrl, realServiceUrl, outputFileName)

  const result = await readFile(outputFileName, 'utf8')

  t.deepEqual(result, expectedYaml)
}

function expectedYaml () {
  return `- name: /one
  request:
    uri: /one
    method: GET
    headers:
      x-special-header: required
  response:
    code: 200
    body: |-
      {
        "users": [
          {
            "name": "/one user 1",
            "id": 1
          },
          {
            "name": "/one user 2",
            "id": 2
          }
        ]
      }

- name: /two
  request:
    uri: /two
    method: GET
    headers:
      x-special-header: required
  response:
    code: 200
    body: |-
      {
        "users": [
          {
            "name": "/two user 1",
            "id": 1
          },
          {
            "name": "/two user 2",
            "id": 2
          }
        ]
      }

- name: /three
  request:
    uri: /three
    method: GET
    headers:
      x-special-header: required
  response:
    code: 200
    body: |-
      {
        "users": [
          {
            "name": "/three user 1",
            "id": 1
          },
          {
            "name": "/three user 2",
            "id": 2
          }
        ]
      }
`
}

function fakeData (uri) {
  return {
    users: [
      { name: `${uri} user 1`, id: 1 },
      { name: `${uri} user 2`, id: 2 }
    ]
  }
}
