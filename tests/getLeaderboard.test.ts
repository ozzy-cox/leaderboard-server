import { app } from '@/app'
import { Context } from '@/context'
import { createDummyUsers } from '@/initializeDbForTests'
import { mockContext } from '@/mockContext'
import { ORM, wipeDb } from '@/orm'
import { pick } from 'lodash-es'

import request from 'supertest'
import { useDummyUsers } from './helpers/UseDummyUsers.test.helpers'

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
