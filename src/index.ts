import { SchemaFieldTypes } from 'redis'
import { app } from './app'
import { createDummyUsers } from './initializeDbForTests'
import { mockContext } from './mockContext'
import { wipeDb } from './orm'
import { REDIS } from './redisClient'

const port = 8000

// Initializing mock data
await wipeDb()
await createDummyUsers()
const context = await mockContext()

const usersWithMoney = await context.userService.getAllUsersWithMoney()
await context.leaderboardService.updateRecords(
  ...usersWithMoney.map((user) => ({ id: user.id, money: user.money || 0 }))
)

const client = await REDIS.getInstance()

try {
  await client.ft.dropIndex('idx:username', { DD: true })
} catch (error) {
  console.log('after', error)
}

try {
  await client.ft.create(
    'idx:username',
    {
      username: {
        type: SchemaFieldTypes.TEXT,
        WITHSUFFIXTRIE: true
      }
    },
    {
      ON: 'HASH',
      PREFIX: 'leaderboard:users'
    }
  )
} catch (error) {
  console.log(error)
}

await Promise.all(
  usersWithMoney.map(async (user) => {
    await context.userService.updateUserCache(user)
  })
)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
