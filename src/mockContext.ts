import redisMock from 'ioredis-mock'
import { Context } from './context'
import { ORM } from './orm'
import { UserRepository } from './user/infra/orm/repositories/UserRepository'
import { UserService } from './user/services/UserService'
import { LeaderboardRepository } from './leaderboard/infra/redis/repositories/LeaderboardRepository'
import { LeaderboardService } from './leaderboard/services/LeaderboardService'

export const mockContext = async (): Promise<Context> => {
  // TODO change orm hook to get different versions of dev and prod
  const orm = await ORM.getInstance()
  const redis = new redisMock()
  const userRepository = new UserRepository(orm.em.fork())
  const leaderboardRepository = new LeaderboardRepository(redis)
  return {
    userService: new UserService(userRepository),
    leaderboardService: new LeaderboardService(leaderboardRepository)
  }
}
