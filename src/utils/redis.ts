import { Redis } from 'ioredis'
import config from '../config/config'

const redisClient = () => {
    if (config.REDIS_URL) {
        return config.REDIS_URL
    }
    throw new Error('Redis connection failed')
}

export const redis = new Redis(redisClient())
