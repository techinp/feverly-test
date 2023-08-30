import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import db from './src/config/db.config.js';
import routes from './src/routes/index.js';

const app = express();
const port = 4000;


db.connect((err) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    } else {
      throw err;
    }
  } else {
    console.log('Connected to MySQL database.');
  }
});

db.on('error', function (err) {
  console.log('[mysql error]', err.code);
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

routes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
