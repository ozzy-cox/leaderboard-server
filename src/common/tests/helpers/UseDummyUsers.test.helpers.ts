import { Context } from '@/context'
import { createDummyUsers } from '@/initializeDbForTests'
import { mockContext } from '@/mockContext'
import { ORM, wipeDb } from '@/orm'

export const useDummyUsers = () => {
  let context: Context
  beforeAll(async () => {
    context = await mockContext()
    await createDummyUsers()

    const usersWithMoney = await context.userService.getAllUsersWithMoney()
    await context.leaderboardService.updateRecords(
      ...usersWithMoney.map((user) => ({ id: user.id, money: user.money || 0 }))
    )
    await Promise.all(
      usersWithMoney.map(async (user) => {
        await context.userService.updateUserCache(user)
      })
    )
  })

  afterAll(async () => {
    await wipeDb()
    await (await ORM.getInstance()).close()
  })

  return () => context
}
