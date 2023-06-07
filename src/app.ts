import express, { Express, NextFunction, Request, Response } from 'express'
import { getLeaderboard } from './leaderboard/controllers/LeaderboardController'
import { Context } from './context'
import { mockContext } from './mockContext'
import { createUser, getUserPlacing, searchUsers } from './user/controllers/UserController'
import { registerGame } from './game/controllers/GameController'
import cors from 'cors'

export const app: Express = express()

const contextMiddleware = (context: Context) => (req: Request, res: Response, next: NextFunction) => {
  req.context = context
  next()
}

const context = await mockContext()

app.use(cors())
app.use(contextMiddleware(context))
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use('/leaderboard', getLeaderboard)
app.use('/user-placing', getUserPlacing)

app.use('/create-user', createUser)
app.use('/register-game', registerGame)

app.use('/search-users', searchUsers)
