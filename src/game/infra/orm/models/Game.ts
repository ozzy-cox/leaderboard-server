import { Base } from '@/common/infra/orm/models/Base'
import { IGame } from '@/game/entities/IGame'
import { IUser } from '@/user/entities/IUser'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'

@Entity()
export class Game extends Base implements IGame {
  @ManyToOne('User')
  // TODO replace the string reference with actual reference and test circular dep
  // This has to be IUser type in order to prevent circular dependency`
  user: IUser

  @Property()
  moneyGained: number

  constructor(user: IUser, moneyGained: number) {
    super()
    this.user = user
    this.moneyGained = moneyGained
  }
}
