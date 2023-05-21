import { app } from '@/app'
import { useDummyUsers } from '@/common/tests/helpers/UseDummyUsers.test.helpers'
import request from 'supertest'

describe('creating a user', () => {
  useDummyUsers()
  test('should create a user and update the leaderboard', async () => {
    const createdUser = await request(app).post('/create-user').send({
      username: 'ozan',
      country: 'turkeys'
    })

    expect(createdUser).not.toBeNull()
    const createdUserId = createdUser.body.id

    const userRankDetails = await request(app).get('/me').query(`user_id=${createdUserId}`)
    expect(userRankDetails).not.toBeNull()
    expect(userRankDetails.body.money).toBe(0)
  })
})
