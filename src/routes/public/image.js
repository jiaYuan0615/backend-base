import { Router } from 'express';
import ImageControler from '../../controllers/image';

const router = Router();

router.get('/:id', ImageControler.getImage);

export default router;
