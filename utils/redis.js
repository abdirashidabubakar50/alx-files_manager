import { createClient }from "redis";

class RedisClient {
  constructor() {
    // Create Redis client with default options
    this.client = createClient();

    // Handle errors
    this.client.on("error", (err) => console.error(`Redis error: ${err}`));

    // Connect the client
    this.client.connect().catch((err) => {
      console.error(`Failed to connect to Redis: ${err}`);
    });
  }

  // Check if Redis is connected
  isAlive() {
    return this.client.isReady;
  }

  // Get a value by key
  async get(key) {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error(`Failed to get key ${key}: ${err}`);
      return null;
    }
  }

  // Set a key-value pair with expiration
  async set(key, value, duration) {
    try {
      await this.client.set(key, value, { EX: duration });
      return true;
    } catch (err) {
      console.error(`Failed to set key ${key}: ${err}`);
      return false;
    }
  }

  // Delete a key
  async del(key) {
    try {
      await this.client.del(key);
      return true;
    } catch (err) {
      console.error(`Failed to delete key ${key}: ${err}`);
      return false;
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
