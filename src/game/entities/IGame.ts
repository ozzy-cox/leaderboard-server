import { IBase } from '@/common/entities/IBase'
import { IUser } from '@/user/entities/IUser'

export interface IGame extends IBase {
  user: IUser
  moneyGained: number
  // There can be additional game related data
}
