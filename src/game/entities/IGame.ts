import { IUser } from '@/user/entities/IUser'

export interface IGame {
  user: IUser
  moneyGained: number
  // There can be additional game related data
}
