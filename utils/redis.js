import redis from 'redis';

class RedisClient {
  constructor() {
    console.log('Initializing Redis client...');

    // Create a Redis client
    this.client = redis.createClient();

    // Listen for connection events
    this.client.on('connect', () => console.log('Redis connected.'));
    this.client.on('error', (err) => console.error(`Redis error: ${err}`));
  }

  isAlive() {
    return this.client.connected; // `connected` is true if Redis is connected
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          console.error(`Failed to get key '${key}': ${err}`);
          reject(err); // Explicit return
          return;
        }
        resolve(value); // Explicit return
      });
    });
  }

  set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err) => {
        if (err) {
          console.error(`Failed to set key '${key}': ${err}`);
          reject(err); // Explicit return
          return;
        }
        resolve(true); // Explicit return
      });
    });
  }

  del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          console.error(`Failed to delete key '${key}': ${err}`);
          reject(err); // Explicit return
          return;
        }
        resolve(true); // Explicit return
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
