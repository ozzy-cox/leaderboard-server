import { app } from '@/app'
import { Context } from '@/context'
import { createDummyUsers } from '@/initializeDbForTests'
import { mockContext } from '@/mockContext'
import { wipeDb } from '@/orm'
import request from 'supertest'
import { useDummyUsers } from './helpers/UseDummyUsers.test.helpers'

describe('getting rank and scores related to the user', () => {
  useDummyUsers()
  test('should get the current user along with their rank and score', async () => {
    const response = await request(app).get('/me')
    const body = response.body
    expect(response).not.toBeUndefined()

    expect(response)
  })
})
