import { useDummyUsers } from '@/common/tests/helpers/UseDummyUsers.test.helpers'
import { UserSearchRepository } from '../infra/orm/repositories/UserSearchRepository'
import { REDIS } from '@/redis'
import { SchemaFieldTypes, createClient } from 'redis'
import assert from 'assert'

describe('searching users', () => {
  let client: ReturnType<typeof createClient>

  beforeAll(async () => {
    client = await REDIS.getInstance()

    try {
      await client.ft.create(
        'idx:username',
        {
          username: {
            type: SchemaFieldTypes.TEXT,
            WITHSUFFIXTRIE: true
          }
        },
        {
          ON: 'HASH',
          PREFIX: 'leaderboard:users'
        }
      )
    } catch (error) {
      console.log(error)
    }
  })

  const getContext = useDummyUsers()

  test('should find users by their username', async () => {
    const { userService } = await getContext()
    const user = await userService.createUser('ozan.koksal', 'turkey')
    assert(user)

    const userSearchRepository = new UserSearchRepository(client)
    const username = 'ozan'

    const results = await userSearchRepository.findUsersByUsername(username)

    expect(results.map((result) => result.username).includes(user?.username)).toBeTruthy()
  })

  afterAll(async () => {
    try {
      await client.ft.dropIndex('idx:username', { DD: true })
    } catch (error) {
      console.log('after', error)
    }
    await client.disconnect()
  })
})
