import express from 'express';
import routes from './routes/index';

const app = express();
const port = process.env.DB_PORT || 5000;

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
