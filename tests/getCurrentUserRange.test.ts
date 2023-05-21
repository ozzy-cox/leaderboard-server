import { app } from '@/app'
import { useDummyUsers } from '@/common/tests/helpers/UseDummyUsers.test.helpers'
import { IUser } from '@/user/entities/IUser'
import assert from 'assert'
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
    const response = await request(app).get('/me').query(`user_id=${user.id}`)
    const body = response.body
    expect(response).not.toBeUndefined()

    expect(response)
    // TODO Test after creating a user and registering game
  })
})
