import { IUser, IUserWithMoney } from '../entities/IUser'

export interface IUserRepository {
  addUser(username: string, country: string): Promise<IUser | undefined> // For testing purposes
  getUsersById(ids: IUser['id'][]): Promise<(IUser | null)[]>
  getTopUsers(amount: number): Promise<IUserWithMoney[]>
  getUserRangeWithMoney(offset: number, limit: number): Promise<IUserWithMoney[]>
}
