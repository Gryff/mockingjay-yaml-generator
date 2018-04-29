import test from 'ava'
import nock from 'nock'
import mockingjayGETRequestBuilder from './helpers/mockingjayGETRequestBuilder'

import mockingjayClient from '../src/mockingjayClient'

const mockingjayUrl = 'http://localhost:9099'

test('makes a call to mockingjay server to get requests', async t => {
  const mjClient = mockingjayClient(mockingjayUrl)

  mockMockingjay([])

  const mjRequests = await mjClient.getRequests()

  t.deepEqual(mjRequests, [])
})

test('returns data from mockingjay without transforming', async t => {
  const mjClient = mockingjayClient(mockingjayUrl)

  const data = ['/one', '/two', '/three'].map(mockingjayGETRequestBuilder)
  mockMockingjay(data)

  const mjRequests = await mjClient.getRequests()

  t.deepEqual(mjRequests, data)
})

function mockMockingjay (data) {
  nock(mockingjayUrl)
    .get('/requests')
    .reply(200, data)
}
