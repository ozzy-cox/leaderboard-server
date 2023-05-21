import { app } from '@/app'
import { useDummyUsers } from '@/common/tests/helpers/UseDummyUsers.test.helpers'
import request from 'supertest'

describe('updating user score', () => {
  useDummyUsers()
  test('should create a user and update their score', async () => {
    const createdUser = await request(app).post('/create-user').send({
      username: 'ozan',
      country: 'turkey'
    })

    expect(createdUser.body).not.toBeUndefined()
    const userId = createdUser.body.id

    await request(app).post('/register-game').send({
      user_id: userId,
      money_gained: 100
    })

    const currentUser = await request(app).get('/me').query(`user_id=${userId}`)

    expect(currentUser.body.money).toBe(100)
  })
})
