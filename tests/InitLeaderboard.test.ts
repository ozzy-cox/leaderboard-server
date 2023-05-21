import { Context } from '@/context'
import { createDummyUsers } from '@/initializeDbForTests'
import { mockContext } from '@/mockContext'
import { ORM, wipeDb } from '@/orm'
import { IUser } from '@/user/entities/IUser'
import { pick } from 'lodash-es'
import { useDummyUsers } from './helpers/UseDummyUsers.test.helpers'

describe('initialize leaderboard from db', () => {
  const getContext = useDummyUsers()

  test('should get all users scores and populate leaderboard', async () => {
    const { userService, leaderboardService } = getContext()
    // In the case of an existing user service, the leaderboard should be pluggable.

    // TODO make it paginatede
    const usersWithMoney = await userService.getAllUsersWithMoney()

    // TODO change the constant length later
    expect(usersWithMoney).toHaveLength(1000)

    await leaderboardService.updateRecords(...usersWithMoney.map((user) => ({ id: user.id, money: user.money || 0 })))

    const expectedLeaderboard = await userService.getTopUsers()
    const leaderboard = await leaderboardService.getLeaderboardRecords()

    expect(leaderboard.length).toEqual(expectedLeaderboard.length)

    expect(leaderboard).toEqual(expectedLeaderboard.map((user) => pick(user, 'id', 'money')))
  })
})
