import { Router } from 'express';
import { get, create, remove, update } from '../api/shops/shop.controller.js';

const router = Router();

router.route('/').get(get);
router.route('/').post(create);
router.route('/').delete(remove);
router.route('/').put(update);

export default router;
