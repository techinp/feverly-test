import { Router } from 'express';
import { validate } from 'express-validation';
import { signIn, signOut, signUp } from '../api/users/user.controller.js';
import { loginValidation } from '../validates/user.validate.js';
import passport from '../middleware/passport.middleware.js';

const router = Router();

router.route('/signUp').post([validate(loginValidation)], signUp);

router.route('/signIn').post([validate(loginValidation)], signIn);

router.route('/signOut').post([passport.required], signOut);

export default router;
