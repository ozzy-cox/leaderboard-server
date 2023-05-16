import { IGame } from '@/game/entities/IGame'
import { IUser } from '@/user/entities/IUser'
import { faker } from '@faker-js/faker'
import { writeFileSync } from 'fs'
import { range } from 'lodash-es'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { v4 } from 'uuid'

export const createFakeUsersFile = (amount: number) => {
  const __filename = fileURLToPath(import.meta.url)

  const __dirname = dirname(__filename)

  const users = []
  for (let i = 0; i < amount; i++) {
    const user = {
      username: faker.internet.userName(),
      country: faker.location.country(),
      id: v4(),
      _games: [] as unknown[]
    }

    user._games = range(Math.floor(Math.random() * 30)).map(() => ({
      id: v4(),
      user: undefined as unknown as IUser,
      moneyGained: Math.floor(Math.random() * 10) * 10
    }))

    users.push(user)
  }

  writeFileSync(join(__dirname, `fakeUser${amount}.json`), JSON.stringify(users), {
    flag: 'w'
  })
}
