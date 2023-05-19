import { IUser } from '@/user/entities/IUser'

export interface ILeaderboardRepository {
  getLeaderboard(amount: number): Promise<Pick<IUser, 'id' | 'money'>[]>
  getUserMoney(id: IUser['id']): Promise<number | null>
  update(...entries: Required<Pick<IUser, 'id' | 'money'>>[]): Promise<number | null>
}
