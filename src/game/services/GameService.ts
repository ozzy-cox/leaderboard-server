import { IUser } from '@/user/entities/IUser'
import { IGameRepository } from '../repositories/IGameRepository'
import { IGame } from '../entities/IGame'

export class GameService {
  constructor(private repository: IGameRepository) {}

  async registerGame(userId: IUser['id'], moneyGained: IGame['moneyGained']) {
    return this.repository.addGame(userId, moneyGained)
  }
}
