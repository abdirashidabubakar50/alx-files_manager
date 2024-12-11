import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.log(`Redis client error: ${err}`);
    });

    (async () => {
      try {
        await this.client.connect();
        console.log('Redis client connected');
      } catch (err) {
        console.error(`Failed to connect to Redis: ${err}`);
      }
    })();
  }

  // check if redis client is connected
  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error(`Error getting key ${key}: ${error}`);
      return null;
    }
  }

  // set a key-value pair in Redis with an expiration
  async set(key, value, duration) {
    try {
      await this.client.set(key, value, 'EX', duration);
    } catch (error) {
      console.error(`Error setting key ${key}: ${error}`);
    }
  }

  // delete a key value pair in Redis
  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error(`Error deleting key ${key}" ${error}`);
    }
  }
}

// create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
