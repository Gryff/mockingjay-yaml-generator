import test from 'ava'

import requestToYaml from '../src/requestToYaml'

test('converts request to yaml', t => {
  const request = {
    URI: "/users?from=0&size=2",
    Method: 'GET',
    Body: '',
    Form: null
  }
  const requestName = 'Get first two users'

  const expectedYaml = `- name: ASFDGASFGDSGF
  request:
    url: /users?from=0&size=2
    method: GET
    response:
      code: 200
      body: '
      {
        "hits": 11,
        "users": [
          {
            "name": "liam",
            id: 1
          },
          {
            "name": "Wolverine",
            "id": 2
          }
        ]
      }'`

  t.deepEqual(requestToYaml({request, requestName}), expectedYaml)
})
