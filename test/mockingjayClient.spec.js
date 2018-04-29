import test from 'ava'
import nock from 'nock'

import mockingjayClient from '../src/mockingjayClient'

test('makes a call to mockingjay server to get requests', async t => {
  const mockingjayUrl = 'http://localhost:9099'
  const mjClient = mockingjayClient(mockingjayUrl)

  nock(mockingjayUrl)
    .get('/requests')
    .reply(200, [])

  const mjRequests = await mjClient.getRequests()

  t.deepEqual(mjRequests, [])
})
