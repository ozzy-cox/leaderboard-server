import { IBase } from '@/common/entities/IBase'
import { IGame } from '@/game/entities/IGame'

export interface IUser extends IBase {
  username: string
  country: string
  money?: number
  get _money(): number
  get _games(): IGame[]
}
