import { ILeaderboardRepository } from '@/leaderboard/repositories/ILeaderboardRepository'
import { IUser } from '@/user/entities/IUser'
import { User } from '@/user/infra/orm/models/User'
import { EntityManager } from '@mikro-orm/sqlite'

export class LeaderboardORMRepository implements ILeaderboardRepository {
  private em: EntityManager
  constructor(em: EntityManager) {
    this.em = em
  }
  async getTopUsers(amount: number): Promise<IUser[]> {
    return await this.em
      .qb(User, 'u')
      .select(['u.username', 'u.country', 'u.id', 'u.createdAt', 'sum(g.money_gained) as money'])
      .join('u.games', 'g')
      .groupBy('u.id')
      .limit(amount)
      .getResultList()
  }
}
