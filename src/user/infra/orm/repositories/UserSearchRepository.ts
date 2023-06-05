import { IUser } from '@/user/entities/IUser'
import { IUserSearchRepository } from '@/user/repositories/IUserSearchRepository'
import { createClient } from 'redis'

export class UserSearchRepository implements IUserSearchRepository {
  constructor(private client: ReturnType<typeof createClient>) {}
  async findUsersByUsername(query: string): Promise<Pick<IUser, 'username' | 'id'>[]> {
    const results = await this.client.ft.search('idx:username', `@username: *${query}*`)
    return results.documents.map((doc) => ({ id: doc.id, username: doc.value.username })) as Pick<
      IUser,
      'username' | 'id'
    >[]
  }

  async cacheUsername(user: IUser): Promise<void> {
    await this.client.hSet(`leaderboard:users:${user.id}`, { username: user.username })
  }
}
