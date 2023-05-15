import { MockUserRepository } from '@/user/infra/mock/MockUserRepository'
import { TOP_PLAYERS_COUNT } from '../configs/BoardConfig'
import { IUser } from '@/user/entities/IUser'
import assert from 'assert'
import { ILeaderboardRepository } from '../repositories/ILeaderboardRepository'
import { MockLeaderboardRepository } from '../infra/mock/MockLeaderboardRepository'
import { LeaderboardService } from '../services/LeaderboardService'

describe('getting leaderboard attributes', () => {
  let leaderboardRepository: ILeaderboardRepository
  let leaderboardService: LeaderboardService
  let userRepository: MockUserRepository
  let createdUser: IUser | undefined

  beforeAll(async () => {
    createdUser = await userRepository.createUser('ozan', 'turkey')
    userRepository = new MockUserRepository()
    leaderboardRepository = new MockLeaderboardRepository()
    leaderboardService = new LeaderboardService(leaderboardRepository)

    // TODO create random data
  })

  test('should get all the top users', async () => {
    assert(createdUser)
    const user = await userRepository.getUser(createdUser.id)
    const topUsers: IUser[] = await leaderboardService.getTopUsers()

    expect(topUsers).toBeLessThanOrEqual(TOP_PLAYERS_COUNT)

    // TODO extend tests
  })

  test('should get the users above our user', () => {
    // TODO Check if the user is already in top 100
  })
})
