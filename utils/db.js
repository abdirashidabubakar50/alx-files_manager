import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}: ${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });

    this.client
      .connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connectingg to MongoDB', error);
        this.db = null;
      });
  }

  isAlive() {
    return this.client && this.client.isConnected();
  }

  async nbUsers() {
    if (!this.db) return 0;
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.db) return 0;
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
