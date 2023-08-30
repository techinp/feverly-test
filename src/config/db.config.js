import { createConnection } from 'mysql2';

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'database_development',
});

export const dbInsert = (res, sql, values, message) => {
  connection.query(sql, values, (err) => {
    if (err) {
      console.log('err :', err);
      return res
        .status(500)
        .json({ message: err.code, cause: err, status: 500 });
    } else return res.status(201).json({ message, cause: '', status: 0 });
  });
};

export default connection;
