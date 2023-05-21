import { Request, Response } from 'express'

export const registerGame = async (req: Request, res: Response) => {
  const { userService, leaderboardService, gameService } = req.context
  const { user_id, money_gained } = req.body
  const user = await userService.getUser(user_id)

  if (user && money_gained) {
    const game = await gameService.registerGame(user.id, money_gained)

    if (game) await leaderboardService.updateScore(user.id, game?.moneyGained)
    res.json(game)
  }
}
