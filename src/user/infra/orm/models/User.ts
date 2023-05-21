import { Base } from '@/common/infra/orm/models/Base'
import { IGame } from '@/game/entities/IGame'
import { Game } from '@/game/infra/orm/models/Game'
import { IUser } from '@/user/entities/IUser'
import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core'
import { sum } from 'lodash-es'

@Entity()
@Unique({ properties: ['id'] })
export class User extends Base implements IUser {
  @Property()
  username!: string

  @Property()
  country!: string

  @OneToMany(() => Game, (game) => game.user)
  games = new Collection<Game>(this)

  @Property({ persist: false })
  money!: number

  get _money(): number {
    return sum(this.games.getItems().map((game) => game.moneyGained))
  }

  get _games(): IGame[] {
    return this.games.getItems()
  }

  constructor(username: string, country: string) {
    super()
    this.username = username
    this.country = country
  }
}
