import test from 'ava'
import nock from 'nock'

import getRealData from '../src/getRealData'

test('takes a list of urls, calls them and returns the data', async t => {
  const realServiceName = 'http://real-service.com'
  const requests = [
    { URI: '/one', Headers: { 'x-special-header': 'required' } },
    { URI: '/two', Headers: { 'x-special-header': 'required' } },
    { URI: '/three', Headers: { 'x-special-header': 'required' } }
  ]

  requests.forEach(request => {
    nock(realServiceName, { reqheaders: request.Headers })
      .get(request.URI)
      .reply(200, fakeData(request))
  })

  const expectedData = requests.map(fakeData)

  const result = await getRealData(realServiceName, requests)

  t.deepEqual(result, expectedData)
})

function fakeData (request) {
  return {
    users: [
      { name: `${request.URI} user 1`, id: 1 },
      { name: `${request.URI} user 2`, id: 2 }
    ]
  }
}
