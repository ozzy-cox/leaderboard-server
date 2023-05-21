import express, { Express, NextFunction, Request, Response } from 'express'
import { getLeaderboard } from './leaderboard/controllers/LeaderboardController'
import { Context } from './context'
import { mockContext } from './mockContext'
import { createDummyUsers } from './initializeDbForTests'

export const app: Express = express()

const contextMiddleware = (context: Context) => (req: Request, res: Response, next: NextFunction) => {
  req.context = context
  next()
}

const context = await mockContext()

app.use(contextMiddleware(context))
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.get('/leaderboard', getLeaderboard)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
