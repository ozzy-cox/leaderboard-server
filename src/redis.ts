import { Redis } from 'ioredis'

export class REDIS {
  private static instance?: Redis

  public static getInstance = async () => {
    if (!REDIS.instance) {
      REDIS.instance = new Redis()
    }
    return REDIS.instance
  }
}
