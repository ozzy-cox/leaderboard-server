import { TOP_PLAYERS_COUNT } from '../configs/BoardConfig'
import { IUser } from '@/user/entities/IUser'
import assert from 'assert'
import { ILeaderboardRepository } from '../repositories/ILeaderboardRepository'
import { IUserRepository } from '@/user/repositories/IUserRepository'
import { UserRepository } from '@/user/infra/orm/repositories/UserRepository'
import { LeaderboardORMRepository } from '../infra/orm/repositories/LeaderboardORMRepository'
import { ORM, wipeDb } from '@/orm'
import { createDummyUsers } from '@/initializeDbForTests'

describe('getting leaderboard attributes', () => {
  let leaderboardRepository: ILeaderboardRepository
  let userRepository: IUserRepository
  let createdUser: IUser | undefined

  beforeAll(async () => {
    const em = (await ORM.getInstance()).em.fork()

    userRepository = new UserRepository(em)
    leaderboardRepository = new LeaderboardORMRepository(em)
    await wipeDb()
    await createDummyUsers(em)
    createdUser = await userRepository.createUser('ozan', 'turkey')
  })

  test('should get all the top users', async () => {
    assert(createdUser)
    // const user = await userRepository.getUser(createdUser.id)
    const topUserIds: IUser[] = await leaderboardRepository.getTopUsers(TOP_PLAYERS_COUNT)

    expect(topUserIds.length).toBeLessThanOrEqual(TOP_PLAYERS_COUNT)

    // TODO extend tests

    test('should get the created user`s leaderboard position', () => {
      //
    })
  })

  afterAll(async () => {
    await wipeDb()
    await (await ORM.getInstance()).close()
  })
})
