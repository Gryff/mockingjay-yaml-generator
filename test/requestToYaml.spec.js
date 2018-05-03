import test from 'ava'

import requestToYaml from '../src/requestToYaml'

test('converts request to yaml', t => {
  const request = {
    URI: '/users?from=0&size=2',
    Method: 'GET',
    Headers: { 'x-special-header': 'required' },
    Body: '',
    Form: null
  }
  const requestName = 'Get first two users'

  const response = {
    hits: 11,
    users: [
      {
        name: 'Liam',
        id: 1
      },
      {
        name: 'Wolverine',
        id: 2
      }
    ]
  }

  const expectedYaml = `- name: ${requestName}
  request:
    uri: /users?from=0&size=2
    method: GET
    headers:
      x-special-header: required
  response:
    code: 200
    body: |-
      {
        "hits": 11,
        "users": [
          {
            "name": "Liam",
            "id": 1
          },
          {
            "name": "Wolverine",
            "id": 2
          }
        ]
      }
`

  t.deepEqual(requestToYaml({request, requestName, response}), expectedYaml)
})
