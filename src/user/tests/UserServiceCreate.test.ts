import { useDummyUsers } from '@/common/tests/helpers/UseDummyUsers.test.helpers'
import assert from 'assert'

describe('creating a user', () => {
  const getContext = useDummyUsers()

  test('should create a user', async () => {
    const { userService } = getContext()

    const user = await userService.createUser('ozan', 'turkey')
    assert(user)

    expect(user).not.toBeUndefined()
  })
})
