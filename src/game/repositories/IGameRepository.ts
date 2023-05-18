import { IUser } from '@/user/entities/IUser'
import { IGame } from '../entities/IGame'

export interface IGameRepository {
  addGame(user: IUser, moneyGained: IGame['moneyGained']): Promise<IGame | undefined>
}
