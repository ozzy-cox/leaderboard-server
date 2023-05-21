import { IUser } from '@/user/entities/IUser'
import { IGame } from '../entities/IGame'

export interface IGameRepository {
  addGame(userId: IUser['id'], moneyGained: IGame['moneyGained']): Promise<IGame | undefined>
}
