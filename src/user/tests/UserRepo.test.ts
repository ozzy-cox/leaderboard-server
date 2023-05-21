import assert from 'assert'
import { IUser } from '../entities/IUser'
import { IUserRepository } from '../repositories/IUserRepository'
import { UserRepository } from '../infra/orm/repositories/UserRepository'
import { ORM, wipeDb } from '@/orm'
import { createDummyUsers } from '@/initializeDbForTests'
import { TOP_PLAYERS_COUNT } from '@/leaderboard/configs/BoardConfig'
import { pick } from 'lodash-es'

describe('getting user info', () => {
  let userRepository: IUserRepository
  let createdUser: IUser | undefined
  let fakeUsers: IUser[]

  beforeAll(async () => {
    const em = (await ORM.getInstance()).em.fork()

    userRepository = new UserRepository(em)
    await wipeDb()
    fakeUsers = await createDummyUsers()
    createdUser = await userRepository.addUser('ozan', 'turkey')
  })

  test('should get user info from repository', async () => {
    assert(createdUser)
    const queriedUser = (await userRepository.getUsersById([createdUser.id]))[0]
    expect(createdUser).toEqual(queriedUser)
  })

  test('should get top users', async () => {
    assert(createdUser)
    // const user = await userRepository.getUser(createdUser.id)
    const topUserIds = await userRepository.getTopUsers(TOP_PLAYERS_COUNT)

    expect(topUserIds.length).toBeLessThanOrEqual(TOP_PLAYERS_COUNT)
  })

  afterAll(async () => {
    await wipeDb()
    await (await ORM.getInstance()).close()
  })
})
