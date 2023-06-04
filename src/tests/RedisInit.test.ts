import { REDIS } from '@/redis'
import type { createClient } from 'redis'

describe('initializing redis', () => {
  let redis: ReturnType<typeof createClient>

  test('should initialize a redis connection', async () => {
    redis = await REDIS.getInstance()

    expect(redis).not.toBeUndefined()
  })

  test('should close a redis connection', async () => {
    redis = await REDIS.getInstance()
    expect(redis.isOpen).toBe(true)

    expect(redis.isOpen).toBe(false)
  })
})
