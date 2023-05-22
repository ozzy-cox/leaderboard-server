import { ILeaderboardRepository } from '@/leaderboard/repositories/ILeaderboardRepository'
import { IUser } from '@/user/entities/IUser'
import Redis from 'ioredis'
import { chunk, flatten } from 'lodash-es'
const REDIS_LEADERBOARD_KEY = 'leaderboard'

export class LeaderboardRepository implements ILeaderboardRepository {
  constructor(private cache: Redis) {}
  async getUserScoresInRange(from: number, to: number) {
    const minRank = Math.max(from, 0)
    const toRank = Math.max(to - 1, 0)
    const userScores: Pick<IUser, 'id' | 'money'>[] = chunk(
      await this.cache.zrange(REDIS_LEADERBOARD_KEY, minRank, toRank, 'REV', 'WITHSCORES'),
      2
    ).map((slice) => ({ id: slice[0], money: parseInt(slice[1]) }))
    return userScores
  }

  async update(...entries: Required<Pick<IUser, 'id' | 'money'>>[]) {
    return await this.cache.zadd(REDIS_LEADERBOARD_KEY, ...flatten(entries.map((entry) => [entry.money, entry.id])))
  }

  async getUserMoney(id: string) {
    const userMoney = await this.cache.zscore(REDIS_LEADERBOARD_KEY, id)
    if (userMoney) {
      return parseInt(userMoney)
    }
    return null
  }

  async getUserRank(id: string): Promise<number | null> {
    return await this.cache.zrevrank(REDIS_LEADERBOARD_KEY, id)
  }

  async getUserScore(id: string): Promise<number | null> {
    const response = await this.cache.zscore(REDIS_LEADERBOARD_KEY, id)

    if (response) return parseInt(response)
    return null
  }

  async incrementUserScore(id: string, moneyGained: number): Promise<number | null> {
    const incr = await this.cache.zincrby(REDIS_LEADERBOARD_KEY, moneyGained, id)
    if (incr) return parseInt(incr)
    return null
  }
}
