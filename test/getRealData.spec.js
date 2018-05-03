import test from 'ava'
import nock from 'nock'

import getRealData from '../src/getRealData'

test('takes a list of urls, calls them and returns the data', async t => {
  const realServiceName = 'http://real-service.com'
  const uris = ['/one', '/two', '/three']

  uris.forEach(uri => {
    nock(realServiceName)
      .get(uri)
      .reply(200, fakeData(uri))
  })

  const expectedData = uris.map(fakeData)

  const result = await getRealData(realServiceName, uris)

  t.deepEqual(result, expectedData)
})

function fakeData (uri) {
  return {
    users: [
      { name: `${uri} user 1`, id: 1 },
      { name: `${uri} user 2`, id: 2 }
    ]
  }
}
