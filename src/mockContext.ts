import redisMock from 'ioredis-mock'
import { Context } from './context'
import { ORM } from './orm'
import { UserRepository } from './user/infra/orm/repositories/UserRepository'
import { UserService } from './user/services/UserService'
import { LeaderboardRepository } from './leaderboard/infra/redis/repositories/LeaderboardRepository'
import { LeaderboardService } from './leaderboard/services/LeaderboardService'
import { GameService } from './game/services/GameService'
import { GameRepository } from './game/infra/orm/repositories/GameRepository'

export const mockContext = async (): Promise<Context> => {
  // TODO change orm hook to get different versions of dev and prod
  const orm = await ORM.getInstance()
  const redis = new redisMock()
  const em = orm.em.fork()
  const userRepository = new UserRepository(em)
  const leaderboardRepository = new LeaderboardRepository(redis)
  const gameRepository = new GameRepository(em)
  return {
    userService: new UserService(userRepository),
    leaderboardService: new LeaderboardService(leaderboardRepository),
    gameService: new GameService(gameRepository)
  }
}
