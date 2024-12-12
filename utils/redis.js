import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    // Log errors
    this.client.on('error', (err) => console.error(`Redis client error: ${err}`));

    // Log successful connection
    this.client.on('connect', () => console.log('Redis client connected'));

    // Connect the client
    this.client.connect().catch((err) => {
      console.error(`Failed to connect to Redis: ${err}`);
    });
  }

  isAlive() {
    // Check if the client connection is open
    return this.client.isOpen;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error(`Error getting key ${key}: ${err}`);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, {
        EX: duration, // Set expiration in seconds
      });
    } catch (err) {
      console.error(`Error setting key ${key}: ${err}`);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(`Error deleting key ${key}: ${err}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
