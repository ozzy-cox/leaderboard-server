import { IUser, IUserWithMoney } from '@/user/entities/IUser'
import { ILeaderboardRepository } from '../repositories/ILeaderboardRepository'
import { TOP_PLAYERS_COUNT } from '../configs/BoardConfig'

export class LeaderboardService {
  constructor(private repository: ILeaderboardRepository) {}

  async updateRecords(...entries: Required<Pick<IUser, 'id' | 'money'>>[]) {
    return await this.repository.update(...entries)
  }

  async getLeaderboardRecords() {
    return await this.repository.getUserScoresInRange(0, TOP_PLAYERS_COUNT)
  }

  async getUserRank(id: string) {
    return await this.repository.getUserRank(id)
  }

  async getUserMoney(id: string) {
    return await this.repository.getUserMoney(id)
  }

  async updateScore(id: IUser['id'], increment: number) {
    return await this.repository.incrementUserScore(id, increment)
  }
}
