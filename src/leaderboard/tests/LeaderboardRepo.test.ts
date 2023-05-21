import { TOP_PLAYERS_COUNT } from '../configs/BoardConfig'
import { IUser } from '@/user/entities/IUser'
import assert from 'assert'
import { v4 } from 'uuid'
import mockRedis from 'ioredis-mock'
import Redis from 'ioredis'
import { ILeaderboardRepository } from '../repositories/ILeaderboardRepository'
import { LeaderboardRepository } from '../infra/redis/repositories/LeaderboardRepository'

describe('getting leaderboard from cache', () => {
  let redis: Redis
  let leaderboardRepository: ILeaderboardRepository
  let userId: IUser['id']

  beforeAll(async () => {
    userId = v4()
    redis = await new mockRedis()
    leaderboardRepository = new LeaderboardRepository(redis)
  })

  beforeEach(async () => {
    // Resets mock redis server
    await redis.flushall()
  })

  test('should attempt to get the score of a user', async () => {
    await leaderboardRepository.update({ id: userId, money: 0 })
    const userMoney = await leaderboardRepository.getUserMoney(userId)

    expect(userMoney).toBe(0)
  })

  test('should update the value of user in leaderboard', async () => {
    const userInitialMoney = 50
    await leaderboardRepository.update({ id: userId, money: userInitialMoney })

    let userMoney = await leaderboardRepository.getUserMoney(userId)

    expect(userMoney).toBe(userInitialMoney)
    assert(userMoney)

    userMoney += 500
    await leaderboardRepository.update({ id: userId, money: userMoney })
    const updatedUserMoney = await leaderboardRepository.getUserMoney(userId)

    expect(updatedUserMoney).toEqual(userMoney)
  })

  test('should get the leaderboard sorted', async () => {
    const users = [
      { id: '1', money: 50 },
      { id: '2', money: 2400 },
      { id: '3', money: 1500 },
      { id: '4', money: 600 },
      { id: '5', money: 1700 }
    ]

    await leaderboardRepository.update(...users)

    const leaderboard = await leaderboardRepository.getUserScoresInRange(0, TOP_PLAYERS_COUNT)

    expect(leaderboard).toHaveLength(users.length)
    expect(leaderboard).toEqual(users.sort((a, b) => b.money - a.money))
  })

  test('should get the user rank and the range of users the current user is in', async () => {
    const users = [
      { id: '1', money: 50 },
      { id: '2', money: 2400 },
      { id: '3', money: 1500 },
      { id: '4', money: 600 },
      { id: '5', money: 1700 },
      { id: '6', money: 1200 },
      { id: '7', money: 1000 },
      { id: '8', money: 4000 },
      { id: '9', money: 2800 },
      { id: '10', money: 1000 },
      { id: '11', money: 1500 }
    ]

    await leaderboardRepository.update(...users)

    const userRank = await leaderboardRepository.getUserRank('7')

    expect(userRank).toBe(7)

    const userScore = await leaderboardRepository.getUserScore('7')

    expect(userScore).toBe(1000)
  })
})
