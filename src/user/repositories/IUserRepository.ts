import { IUser } from '../entities/IUser'

export interface IUserRepository {
  createUser(username: string, country: string): Promise<IUser | undefined> // For testing purposes
  getUser(id: string): Promise<IUser | undefined>
}
