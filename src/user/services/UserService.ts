import { TOP_PLAYERS_COUNT } from '@/leaderboard/configs/BoardConfig'
import { IUserRepository } from '../repositories/IUserRepository'
import { IUser } from '../entities/IUser'

export class UserService {
  constructor(private repository: IUserRepository) {}

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
    return await this.repository.addUser(username, country)
  }

  async getUser(id: IUser['id']) {
    return (await this.repository.getUsersById([id]))[0]
  }
}
