import { Request, Response } from 'express'
import { pick } from 'lodash-es'

export const getLeaderboard = async (req: Request, res: Response) => {
  const { leaderboardService, userService } = req.context
  const leaderboardRecords = await leaderboardService.getLeaderboardRecords()
  const leaderboardUserDetails = await userService.getUsersById(leaderboardRecords.map((record) => record.id))
  leaderboardRecords.forEach((record) => {
    const user = record.id in leaderboardUserDetails && leaderboardUserDetails[record.id]
    if (user) {
      Object.assign(record, pick(user, 'country', 'username'))
    }
  })
  res.json(leaderboardRecords)
}

export const getUserRangeInLeaderboard = async (req: Request, res: Response) => {
  // TODO
}
