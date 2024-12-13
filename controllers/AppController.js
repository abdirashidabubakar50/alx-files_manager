import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppContoller {
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  static async getStats(req, res) {
    try {
      const userCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();
      res.status(200).json({
        users: userCount,
        files: filesCount
      });
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch stats' });
    }
  }
}

export default AppContoller;
