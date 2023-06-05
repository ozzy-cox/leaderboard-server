import { IUser } from '../entities/IUser'

export interface IUserSearchRepository {
  findUsersByUsername(query: string): Promise<Pick<IUser, 'id' | 'username'>[]>
  cacheUsername(user: IUser): Promise<void>
}
