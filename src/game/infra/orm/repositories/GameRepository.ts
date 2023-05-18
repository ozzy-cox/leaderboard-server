import { IGame } from '@/game/entities/IGame'
import { IGameRepository } from '@/game/repositories/IGameRepository'
import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core'
import { Game } from '../models/Game'
import { IUser } from '@/user/entities/IUser'

export class GameRepository implements IGameRepository {
  private em: EntityManager<IDatabaseDriver<Connection>>
  constructor(em: EntityManager<IDatabaseDriver<Connection>>) {
    this.em = em
  }

  async addGame(user: IUser, moneyGained: number): Promise<IGame | undefined> {
    const game = new Game(user, moneyGained)
    this.em.persistAndFlush(game)
    return game
  }
}
