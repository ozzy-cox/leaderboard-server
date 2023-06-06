import redis from 'redis'

export class REDIS {
  private static instance?: ReturnType<typeof redis.createClient>

  public static getInstance = async (): Promise<ReturnType<typeof redis.createClient>> => {
    if (!REDIS.instance) {
      const client = await redis.createClient({
        url: 'redis://localhost:6399'
      })

      client.on('error', (err) => console.log('Redis Client Error', err))

      await client.connect()
      REDIS.instance = client
    }
    return REDIS.instance
  }
}
