import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core'
import fakeUsers from './fakeUser1000.json' assert { type: 'json' }
import { IUser } from './user/entities/IUser'
import { User } from './user/infra/orm/models/User'
import { Game } from './game/infra/orm/models/Game'

export const createDummyUsers = async (em: EntityManager<IDatabaseDriver<Connection>>) => {
  const _fakeUsers = fakeUsers as IUser[]
  for (let i = 0; i < _fakeUsers?.length; i++) {
    const fakeUser = _fakeUsers[i]
    const user = new User(fakeUser.username, fakeUser.country)
    user.games.add(fakeUser._games.map((game) => new Game(user, game.moneyGained)))
    em.persist(user)
  }
  await em.flush()
}
