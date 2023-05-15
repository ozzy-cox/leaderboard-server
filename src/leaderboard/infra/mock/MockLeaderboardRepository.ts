import { ILBUserRepr } from '@/leaderboard/entities/ILeaderboard'
import { ILeaderboardRepository } from '@/leaderboard/repositories/ILeaderboardRepository'
import { OrderedSet } from 'immutable'

export class MockLeaderboardRepository implements ILeaderboardRepository {
  leaderboard: OrderedSet<ILBUserRepr> = OrderedSet()
  async getTopUsers(amount: number): Promise<ILBUserRepr[]> {
    return this.leaderboard.slice(0, amount).toArray()
  }
}
