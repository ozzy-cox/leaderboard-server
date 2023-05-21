import { app } from '@/app'
import { useDummyUsers } from '@/common/tests/helpers/UseDummyUsers.test.helpers'
import { pick } from 'lodash-es'

import request from 'supertest'

describe('getting the leaderboard', () => {
  const getContext = useDummyUsers()

  test('should get the leaderboard with user data', async () => {
    const context = getContext()
    const response = await request(app).get('/leaderboard')
    const expectedResponse = await context.userService.getTopUsers()
    const body = response.body
    expect(response).not.toBeUndefined()
    expect(body).toEqual(expectedResponse.map((user) => pick(user, 'id', 'money', 'username', 'country')))
  })
})
