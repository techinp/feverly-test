import appConfig from '../config/app.config.js';
import db from '../config/db.config.js';
import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';

const verifyToken = (token) => {
  try {
    return jwt.verify(token, appConfig.jwtSecret, (err, decoded) => {
      if (err) throw err;
      else return decoded;
    });
  } catch (error) {
    return null;
  }
};

const checkExpired = (exp) => {
  return exp * 1000 < new Date().getTime();
};

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    const tokenDecrypted = verifyToken(authorization.split(' ')[1]);
    const isExpired = checkExpired(tokenDecrypted?.exp);

    if (!isExpired) {
      return authorization.split(' ')[1];
    }
  }
  return null;
};

export default {
  required: expressjwt({
    secret: appConfig.jwtSecret,
    requestProperty: 'payload',
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'],
  }),
  optional: expressjwt({
    secret: appConfig.jwtSecret,
    requestProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ['HS256'],
  }),
};
