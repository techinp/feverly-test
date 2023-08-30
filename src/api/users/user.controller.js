import jwt from 'jsonwebtoken';

import service from './user.service.js';
import db, { dbInsert } from '../../config/db.config.js';
import appConfig from '../../config/app.config.js';

export async function signUp(req, res) {
  try {
    const { username, password } = req.body;
    let _password = await service.hashPassword(password);

    const sql = 'INSERT INTO users(username, password) VALUES(?, ?)';
    const values = [username, _password];

    dbInsert(res, sql, values, 'User Created');

    // query(
    //   'INSERT INTO users(username, password) VALUES(?, ?)',
    //   [username, _password],
    //   (err) => {
    //     if (err) {
    //       console.log('err :', err);
    //       return res.status(500).json({ message: err.code, cause: err });
    //     } else
    //       return res.status(201).json({ message: 'User Created', cause: '' });
    //   }
    // );
  } catch (error) {
    return res.status(500).json({ ...error, status: 500 });
  }
}

export async function signIn(req, res) {
  try {
    const { username, password } = req.body;

    db.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (err, results, fields) => {
        if (results.length) {
          const user = results[0];

          if (service.comparePassword(password, user.password)) {
            const token = jwt.sign(
              {
                userId: user.id,
                username: user.username,
              },
              appConfig.jwtSecret,
              { expiresIn: appConfig.jwtExpiredTime }
            );
            db.query(
              'UPDATE users SET token = ? WHERE id = ?',
              [token, user.id],
              (_err, _results, _fields) => {
                console.log('_err :', _err);
                if (_err) {
                  return res.status(500).json({
                    message: err?.code || 'Somethings went wrong',
                    cause: err || '',
                    status: 500,
                  });
                } else {
                  const response = {
                    token,
                    userId: user.id,
                    username: user.username,
                  };
                  return res.status(200).json({
                    message: 'Sign in Success',
                    cause: '',
                    data: response,
                    status: 0,
                  });
                }
              }
            );
          }

          //   }
        } else {
          return res.status(400).json({
            message: err?.code || 'username or password incorrect',
            cause: err || '',
            status: 400,
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ ...error, status: 500 });
  }
}

export async function signOut(req, res) {
  try {
    db.query(
      'UPDATE users SET token = null WHERE id = ?',
      [req.payload.userId],
      (_err, _results, _fields) => {
        if (_err) {
          return res.status(500).json({
            message: err?.code || 'Somethings went wrong',
            cause: err || '',
            status: 500,
          });
        } else {
          return res.status(200).json({
            message: 'Sign Out Success',
            cause: '',
            data: null,
            status: 0,
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ ...error, status: 500 });
  }
}
