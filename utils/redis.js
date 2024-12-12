import { createClient } from "redis";

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on("error", (err) => {
      console.error(`Redis client error: ${err.message}`);
    });
  }

  async connect() {
    if (!this.client.isOpen) {
      try {
        await this.client.connect();
      } catch (err) {
        console.error(`Failed to connect to Redis: ${err.message}`);
      }
    }
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    try {
      await this.connect();
      const value = await this.client.get(key);
      return value === null ? null : value;
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
