import assert from 'assert'
import { IUser } from '../entities/IUser'
import { IUserRepository } from '../repositories/IUserRepository'
import { UserRepository } from '../infra/orm/repositories/UserRepository'
import { ORM, wipeDb } from '@/orm'
import { off } from 'process'
import { createDummyUsers } from '@/initializeDbForTests'

describe('getting user info', () => {
  let userRepository: IUserRepository
  let user: IUser | undefined
  let createdUser: IUser | undefined

  beforeAll(async () => {
    const em = (await ORM.getInstance()).em.fork()

    userRepository = new UserRepository(em)
    await wipeDb()
    await createDummyUsers(em)
    createdUser = await userRepository.createUser('ozan', 'turkey')
  })

  test('should get user info from repository', async () => {
    assert(createdUser)
    const queriedUser = await userRepository.getUser(createdUser.id)
    expect(createdUser).toEqual(queriedUser)
  })

  afterAll(async () => {
    await wipeDb()
    await (await ORM.getInstance()).close()
  })
})
