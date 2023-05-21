import { GameService } from './game/services/GameService'
import { LeaderboardService } from './leaderboard/services/LeaderboardService'
import { UserService } from './user/services/UserService'

export interface Context {
  userService: UserService
  leaderboardService: LeaderboardService
  gameService: GameService
}
