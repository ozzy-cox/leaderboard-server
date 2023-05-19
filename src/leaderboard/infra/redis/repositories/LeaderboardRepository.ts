import { ILeaderboardRepository } from '@/leaderboard/repositories/ILeaderboardRepository'
import { IUser } from '@/user/entities/IUser'
import Redis from 'ioredis'
import { chunk, flatten } from 'lodash-es'
const REDIS_LEADERBOARD_KEY = 'leaderboard'

export class LeaderboardRepository implements ILeaderboardRepository {
  constructor(private cache: Redis) {}
  async getLeaderboard(amount: number) {
    const userScores: Pick<IUser, 'id' | 'money'>[] = chunk(
      await this.cache.zrange(REDIS_LEADERBOARD_KEY, 0, amount, 'WITHSCORES'),
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
}
