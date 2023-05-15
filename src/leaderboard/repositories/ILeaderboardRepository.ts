import { ILBUserRepr } from '../entities/ILeaderboard'

export interface ILeaderboardRepository {
  getTopUsers(amount: number): Promise<ILBUserRepr[]>
}
