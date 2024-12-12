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
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();

    res.status(200).json({
      users: usersCount,
      files: filesCount,
    });
  }
}

export default AppContoller;
