import { IUser } from '@/user/entities/IUser'

export interface ILeaderboardRepository {
  getTopUsers(amount: number): Promise<IUser[]>
}
