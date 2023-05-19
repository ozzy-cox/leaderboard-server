import { ORM } from '@/orm'
import { MikroORM } from '@mikro-orm/core'

describe('connecting to db with orm', () => {
  let orm: MikroORM
  test('should create a db connection', async () => {
    orm = await ORM.getInstance()
    expect(await orm.isConnected()).toBeTruthy()
  })

  test('should close a created orm connection', async () => {
    orm = await ORM.getInstance()
    await orm.close()
    expect(await orm.isConnected()).toBeFalsy()
  })
})
