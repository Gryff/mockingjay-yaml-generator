import test from 'ava'
import nock from 'nock'
import mockingjayGETRequestBuilder from './helpers/mockingjayGETRequestBuilder'

import getMockingjayRequests from '../src/getMockingjayRequests'

const mockingjayUrl = 'http://localhost:9099'

test('makes a call to mockingjay server to get requests', async t => {
  mockMockingjay([])

  const mjRequests = await getMockingjayRequests(mockingjayUrl)

  t.deepEqual(mjRequests, [])
})

test('returns data from mockingjay without transforming', async t => {
  const data = ['/one', '/two', '/three'].map(mockingjayGETRequestBuilder)
  mockMockingjay(data)

  const mjRequests = await getMockingjayRequests(mockingjayUrl)

  t.deepEqual(mjRequests, data)
})

function mockMockingjay (data) {
  nock(mockingjayUrl)
    .get('/requests')
    .reply(200, data)
}
