import { IUser } from '@/user/entities/IUser'
import { IUserRepository } from '@/user/repositories/IUserRepository'
import { User } from '../models/User'
import { SqlEntityRepository, EntityManager } from '@mikro-orm/sqlite'
import { QueryOrder } from '@mikro-orm/core'

export class UserRepository implements IUserRepository {
  private repository: SqlEntityRepository<User>
  private em: EntityManager
  constructor(em: EntityManager) {
    this.repository = em.getRepository(User)
    this.em = em
  }

  async getUsersById(ids: IUser['id'][]) {
    return await this.repository.find({ id: { $in: ids } }, { cache: true })
  }

  async addUser(username: IUser['username'], country: IUser['country']) {
    const user = new User(username, country)
    this.em.persist(user)
    this.em.flush()
    return user
  }

  async getTopUsers(amount: number) {
    return await this.em
      .qb(User, 'u')
      .select(['u.username', 'u.country', 'u.id', 'u.createdAt', 'sum(g.money_gained) as money'])
      .leftJoin('u.games', 'g')
      .groupBy('u.id')
      .orderBy({ money: QueryOrder.desc, id: QueryOrder.desc })
      .limit(amount)
      .cache()
      .getResultList()
  }

  async getUserRangeWithMoney(offset: number, limit: number) {
    return await this.em
      .qb(User, 'u')
      .select(['u.username', 'u.country', 'u.id', 'u.createdAt', 'sum(g.money_gained) as money'])
      .leftJoin('u.games', 'g')
      .groupBy('u.id')
      .limit(limit)
      .offset(offset)
      .cache()
      .getResultList()
  }
}
