import express, { Express, NextFunction, Request, Response } from 'express'
import { getLeaderboard, getUserRangeInLeaderboard } from './leaderboard/controllers/LeaderboardController'
import { Context } from './context'
import { mockContext } from './mockContext'
import { createUser, getCurrentUser } from './user/controllers/UserController'
import { registerGame } from './game/controllers/GameController'

export const app: Express = express()

const contextMiddleware = (context: Context) => (req: Request, res: Response, next: NextFunction) => {
  req.context = context
  next()
}

const context = await mockContext()

app.use(contextMiddleware(context))
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use('/leaderboard', getLeaderboard)
app.use('/me', getCurrentUser)
app.use('/my-range', getUserRangeInLeaderboard)

app.use('/create-user', createUser)
app.use('/register-game', registerGame)
