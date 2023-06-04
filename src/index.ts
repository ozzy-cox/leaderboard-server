import { app } from './app'
import { createDummyUsers } from './initializeDbForTests'
import { mockContext } from './mockContext'
import { wipeDb } from './orm'

const port = 8000

// Initializing mock data
await wipeDb()
await createDummyUsers()
const context = await mockContext()

const usersWithMoney = await context.userService.getAllUsersWithMoney()
await context.leaderboardService.updateRecords(
  ...usersWithMoney.map((user) => ({ id: user.id, money: user.money || 0 }))
)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
