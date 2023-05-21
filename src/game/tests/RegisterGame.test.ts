import { IUserRepository } from '@/user/repositories/IUserRepository'
import { IGameRepository } from '../repositories/IGameRepository'
import assert from 'assert'
import { UserRepository } from '@/user/infra/orm/repositories/UserRepository'
import { ORM, wipeDb } from '@/orm'
import { createDummyUsers } from '@/initializeDbForTests'
import { IUser } from '@/user/entities/IUser'
import { GameRepository } from '../infra/orm/repositories/GameRepository'
import { useDummyUsers } from '@/common/tests/helpers/UseDummyUsers.test.helpers'

describe('registering a game result', () => {
  useDummyUsers()
  let userRepository: IUserRepository
  let gameRepository: IGameRepository
  let createdUser: IUser | undefined

  beforeAll(async () => {
    const em = (await ORM.getInstance()).em.fork()

    userRepository = new UserRepository(em)
    gameRepository = new GameRepository(em)
    createdUser = await userRepository.addUser('ozan', 'turkey')
  })

  test('should register a game result', async () => {
    assert(createdUser)

    const moneyGained = 50
    const game = await gameRepository.addGame(createdUser.id, moneyGained)

    expect(game?.user.id).toEqual(createdUser.id)
    expect(game?.moneyGained).toEqual(moneyGained)
  })
})
