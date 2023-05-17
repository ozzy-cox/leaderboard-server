import { IUser } from '@/user/entities/IUser'
import { IUserRepository } from '@/user/repositories/IUserRepository'
import { User } from '../models/User'
import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core'
import { SqlEntityRepository } from '@mikro-orm/sqlite'

export class UserRepository implements IUserRepository {
  private repository: SqlEntityRepository<User>
  private em: EntityManager
  constructor(em: EntityManager) {
    this.repository = em.getRepository(User)
    this.em = em
  }

  async getUser(id: string) {
    return await this.repository.findOne({ id: id })
  }

  async createUser(username: IUser['username'], country: IUser['country']) {
    const user = new User(username, country)
    this.em.persist(user)
    this.em.flush()
    return user
  }
}
