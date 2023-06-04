import { createClient } from 'redis'
import type { RedisClientType } from 'redis'

export class REDIS {
  private static instance?: ReturnType<typeof createClient>

  public static getInstance = async () => {
    if (!REDIS.instance) {
      const client = createClient({
        url: ''
      })

      client.on('error', (err) => console.log('Redis Client Error', err))

      await client.connect()
      REDIS.instance = client
    }
    return REDIS.instance
  }
}
