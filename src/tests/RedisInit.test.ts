import { REDIS } from '@/redis'
import Redis from 'ioredis'

describe('initializing redis', () => {
  let redis: Redis | undefined

  test('should initialize a redis connection', async () => {
    redis = await REDIS.getInstance()

    expect(redis).not.toBeUndefined()
  })

  test('should close a redis connection', async () => {
    redis = await REDIS.getInstance()
    await redis.disconnect()

    expect(redis.status).toBe('connecting')
  })
})
