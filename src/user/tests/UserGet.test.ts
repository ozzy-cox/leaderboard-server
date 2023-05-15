import assert from 'assert'
import { IUser } from '../entities/IUser'
import { MockUserRepository } from '../infra/mock/MockUserRepository'
import { IUserRepository } from '../repositories/IUserRepository'

describe('getting user info', () => {
  let userRepository: IUserRepository
  let createdUser: IUser | undefined
  beforeAll(async () => {
    userRepository = new MockUserRepository()
    createdUser = await userRepository.createUser('ozan', 'turkey')
  })

  test('should get user info from repository', async () => {
    assert(createdUser)
    const user = await userRepository.getUser(createdUser.id)

    expect(user).toEqual(createdUser)
  })
})
