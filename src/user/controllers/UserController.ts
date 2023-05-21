import { Request, Response } from 'express'

export const createUser = async (req: Request, res: Response) => {
  const { userService, leaderboardService } = req.context

  const { username, country } = req.body
  if (username && country) {
    const user = await userService.createUser(username, country)
    if (user) {
      await leaderboardService.updateRecords({
        id: user.id,
        money: 0
      })
      res.json(user)
    }
  }
}

export const getCurrentUser = async (req: Request, res: Response) => {
  const { leaderboardService, userService } = req.context
  const userId = req.query.user_id as string
  if (userId) {
    const userResponses = await userService.getUsersById([userId])
    if (userResponses && userId in userResponses) {
      const user = userResponses[userId]
      if (user) {
        Object.assign(user, {
          money: await leaderboardService.getUserMoney(userId),
          rank: await leaderboardService.getUserRank(userId)
        })
        res.json(user)
      }
    }
  }
}
