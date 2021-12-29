/* eslint-disable no-underscore-dangle */
import { Router } from 'express';
import ImageControler from '../../controllers/image';
import UploadMiddleware from '../../middlewares/upload';

const router = Router();

router.post('/',
  UploadMiddleware.uploadFile.single('upload'),
  UploadMiddleware.transferSingleFileToWebp,
  ImageControler._postImage);

router.delete('/:id', ImageControler._deleteImage);
export default router;
