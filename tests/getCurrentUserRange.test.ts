import { app } from '@/app'
import { useDummyUsers } from '@/common/tests/helpers/UseDummyUsers.test.helpers'
import { IUser } from '@/user/entities/IUser'
import assert from 'assert'
import { every, isInteger } from 'lodash-es'
import request from 'supertest'

describe('getting rank and scores related to the user', () => {
  let user: IUser | undefined
  const getContext = useDummyUsers()

  beforeAll(async () => {
    const { userService, leaderboardService } = getContext()
    user = await userService.createUser('ozan', 'turkey')
    assert(user)
    await leaderboardService.updateRecords({
      id: user.id,
      money: 0
    })
  })

  test('should get the current user along with their rank and score', async () => {
    assert(user)
    // todo get user id from auth header
    let response = await request(app).get('/me').query(`user_id=${user.id}`)
    let body = response.body
    expect(response).not.toBeUndefined()

    expect(body).toHaveProperty('rank')
    expect(isInteger(body.rank)).toBeTruthy()
    expect(body.money).toBe(0)

    expect(body.range.length).toBeLessThanOrEqual(6)

    await request(app).post('/register-game').send({
      user_id: body.id,
      money_gained: 1000
    })

    response = await request(app).get('/me').query(`user_id=${user.id}`)
    body = response.body

    expect(body.money).toBe(1000)
    expect(body.range).toHaveLength(6)
  })
})
