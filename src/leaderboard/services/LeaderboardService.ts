import { IUser } from '@/user/entities/IUser'
import { TOP_PLAYERS_COUNT } from '../configs/BoardConfig'
import { ILeaderboardRepository } from '../repositories/ILeaderboardRepository'

export class LeaderboardService {
  repository: ILeaderboardRepository
  constructor(repository: ILeaderboardRepository) {
    this.repository = repository
  }

  async getTopUsers(): Promise<IUser[]> {
    // TODO get actual user objects from the reprs
    return this.repository.getTopUsers(TOP_PLAYERS_COUNT) as unknown as IUser[]
  }
}
