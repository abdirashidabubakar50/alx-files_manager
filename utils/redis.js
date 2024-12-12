import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.error(`Redis client error: ${err.message}`);
    });

    this.connected = false;
  }

  async connect() {
    if (!this.connected) {
      try {
        await this.client.connect();
        this.connected = true;
      } catch (err) {
        console.error(`Failed to connect to Redis: ${err.message}`);
      }
    }
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    try {
      await this.connect();
      return await this.client.get(key);
    } catch (err) {
      console.error(`Error getting key ${key}: ${err.message}`);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.connect();
      await this.client.set(key, value, {
        EX: duration,
      });
    } catch (err) {
      console.error(`Error setting key ${key}: ${err.message}`);
    }
  }

  async del(key) {
    try {
      await this.connect();
      await this.client.del(key);
    } catch (err) {
      console.error(`Error deleting key ${key}: ${err.message}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
