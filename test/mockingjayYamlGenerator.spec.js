import test from 'ava'
import nock from 'nock'
import fs from 'fs'
import util from 'util'
import mockingjayGETRequestBuilder from './helpers/mockingjayGETRequestBuilder'

import mockingjayYamlGenerator from '../src/mockingjayYamlGenerator'

test('gets requests from a mockingjay server, outputs a yaml file with data', async t => {
  const mockingjayUrl = 'http://localhost:9099'
  const realServiceUrl = 'https://real-service.com'
  const outputFileName = 'test-data.yaml'
  const uris = ['/one', '/two', '/three']

  nock(mockingjayUrl)
    .get('/requests')
    .reply(200, uris.map(mockingjayGETRequestBuilder))

  uris.forEach(uri => {
    nock(realServiceUrl)
      .get(uri)
      .reply(200, fakeData(uri))
  })

  const expectedYaml = `- name: /one
  request:
    uri: /one
    method: GET
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

  await mockingjayYamlGenerator(mockingjayUrl, realServiceUrl, outputFileName)

  const result = await readFile(outputFileName, 'utf8')

  t.deepEqual(result, expectedYaml)
})

const readFile = util.promisify(fs.readFile)

function fakeData (uri) {
  return {
    users: [
      { name: `${uri} user 1`, id: 1 },
      { name: `${uri} user 2`, id: 2 }
    ]
  }
}
