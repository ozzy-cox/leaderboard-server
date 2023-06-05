import { TOP_PLAYERS_COUNT } from '@/leaderboard/configs/BoardConfig'
import { IUserRepository } from '../repositories/IUserRepository'
import { IUser } from '../entities/IUser'
import { IUserSearchRepository } from '../repositories/IUserSearchRepository'

export class UserService {
  constructor(private repository: IUserRepository, private cache?: IUserSearchRepository) {}

  async getAllUsersWithMoney() {
    // TODO should return an iterator later
    return await this.repository.getUserRangeWithMoney(0, 1000)
  }

  async getTopUsers() {
    return await this.repository.getTopUsers(TOP_PLAYERS_COUNT)
  }

  async getUsersById(ids: IUser['id'][]): Promise<Record<IUser['id'], IUser | undefined>> {
    const users = await this.repository.getUsersById(ids)
    return ids.reduce((acc, curr) => ({ ...acc, [curr]: users.find((user) => user && user.id === curr) }), {})
  }

  async createUser(username: IUser['username'], country: IUser['country']) {
    const newUser = await this.repository.addUser(username, country)
    if (this.cache && newUser) {
      await this.cache?.cacheUsername(newUser)
    }
    return newUser
  }

  async getUser(id: IUser['id']) {
    return (await this.repository.getUsersById([id]))[0]
  }

  async updateUserCache(user: IUser) {
    if (this.cache) {
      await this.cache?.cacheUsername(user)
    }
  }
}
