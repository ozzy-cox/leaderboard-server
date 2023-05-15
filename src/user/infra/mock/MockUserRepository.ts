import { MockBaseRepository } from '@/common/infra/mock/MockBaseRepository'
import { IUserRepository } from '@/user/repositories/IUserRepository'
import { MockUserModel } from './MockUserModel'
import { uuid } from 'uuidv4'

export class MockUserRepository extends MockBaseRepository<MockUserModel> implements IUserRepository {
  async getUser(id: string): Promise<MockUserModel | undefined> {
    return this.entities.find((user) => user.id === id)
  }

  async createUser(username: string, country: string): Promise<MockUserModel | undefined> {
    const user = new MockUserModel(uuid(), username, country)
    this.entities.push(user)
    return user
  }
}
