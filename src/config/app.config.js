import 'dotenv/config';

export default {
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiredTime: process.env.JWT_EXPIREATION_TIME,
};
