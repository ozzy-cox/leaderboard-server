import { IGame } from '@/game/entities/IGame'
import { IUser } from '@/user/entities/IUser'

export interface ILeaderboardRepository {
  getUserScoresInRange(from: number, to: number): Promise<Pick<IUser, 'id' | 'money'>[]>
  getUserMoney(id: IUser['id']): Promise<number | null>
  update(...entries: Required<Pick<IUser, 'id' | 'money'>>[]): Promise<number | null>
  getUserRank(id: IUser['id']): Promise<number | null>
  getUserScore(id: IUser['id']): Promise<number | null>
  incrementUserScore(id: IUser['id'], moneyGained: IGame['moneyGained']): Promise<number | null>
}
