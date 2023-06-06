import { Request, Response } from 'express'
import { IUser } from '../entities/IUser'

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
      const userRank = await leaderboardService.getUserRank(userId)
      if (user && userRank) {
        let userRange: IUser[] = (await leaderboardService.getUserRange(userRank)) as IUser[]
        const userRangeDetails = await userService.getUsersById(userRange.map((user) => user.id))
        userRange = userRange.map(
          (user) =>
            ({
              ...userRangeDetails[user.id],
              money: user.money
            } as IUser)
        )
        Object.assign(user, {
          money: await leaderboardService.getUserMoney(userId)
        })
        res.json({
          ...user,
          rank: userRank,
          range: userRange
        })
      }
    }
  }
}

export const searchUsers = async (req: Request, res: Response) => {
  const { userService } = req.context

  const query = req.query.query as string
  if (query && query.length > 2) {
    const results = await userService.searchUsernames(query)
    res.json(results)
  }
  return res.status(500)
}
