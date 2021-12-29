import { Router } from 'express';

import image from './public/image';
import privateImage from './private/image';

import AdminMiddleware from '../middlewares/admin';

const router = Router();

/**
 * public
 */
router.use('/image', image);

/**
 * private
 */
router.use('/private/image', AdminMiddleware.authenticate, privateImage);

export default router;
