const sha1 = require('sha1');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Validate request
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      // Check if user exists
      const userExists = await ( await dbClient.db
        .collection('users'))
        .findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: 'Already exist' });
      }

      // Hash the password and insert the user
      const hashedPassword = sha1(password);
      const result = await ( await dbClient.db.collection('users')).insertOne({
        email,
        password: hashedPassword,
      });

      // Respond with the new user data
      return res.status(201).json({
        id: result.insertedId.toString(),
        email,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UsersController;
