import { createClient } from 'redis';

class RedisClient {
  constructor() {
    // Create Redis client
    this.client = createClient();

    // Handle errors
    this.client.on('error', (err) => console.error('Redis error: ${err}'));
  }

  // Check if Redis is connected
  isAlive() {
    return this.client.connected;
  }

  // Get a value by key
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  // Set a key-value pair with expiration
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  // Delete a key
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;