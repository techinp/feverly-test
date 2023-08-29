import { ValidationError } from 'express-validation';

import userRoutes from './user.route.js';
import bannerRoutes from './banner.route.js';
import shopRoutes from './shop.route.js';
import passport from '../middleware/passport.middleware.js';

// import banner from './banner.route.js';
// import shop from './shop.route.js';

export default (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/user', passport.optional, userRoutes);
  app.use('/banner', passport.required, bannerRoutes);
  app.use('/shop', passport.required, shopRoutes);

  app.use(function (err, req, res, next) {
    console.log('err index routes :', err);
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }

    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).json({
        message: err.name,
        cause: err.inner.message,
      });
    }

    return res.status(500).json(err);
  });
};
