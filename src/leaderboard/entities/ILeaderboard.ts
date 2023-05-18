import { IUser } from '@/user/entities/IUser'

export interface ILeaderboard {
  topPlayers: IUser[]
  playersAbove: IUser[]
  currentUser: IUser
  playersBelow: IUser[]
}
