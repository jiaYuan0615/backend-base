import _ from 'lodash';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import webp, { cwebp } from 'webp-converter';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { fieldname } = file;
    const basePath = path.resolve(__dirname, '../../storage');
    const targetPath = path.resolve(__dirname, `../../storage/${fieldname}`);
    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);
    if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath);
    cb(null, targetPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}${path.extname(file.originalname)}`);
  },
});

class UploadMiddleware {
  constructor() {
    webp.grant_permission();
  }

  uploadFile = multer({ storage });

  transferSingleFileToWebp = async (req, res, next) => {
    const { path: paths, filename, destination } = req.file;
    // yield webpFile
    const transferFile = filename.replace('.jpg', '.webp');
    const targetPath = path.resolve(destination, transferFile);
    await cwebp(paths, targetPath, '-q 80');
    const { size } = fs.statSync(targetPath);

    // Delete Origin File
    if (fs.existsSync(paths)) fs.unlinkSync(paths);

    req.file = {
      ...req.file,
      size,
      filename: transferFile,
      path: targetPath,
    };
    next();
  }

  transferMultipleFileToWebp = async (req, res, next) => {
    const payload = {};
    const { files } = req;
    await Promise.all(_.map(Object.keys(files), async (key) => {
      payload[key] = await Promise.all(_.map(files[key], async (v) => {
        const { path: paths, filename, destination } = v;
        const transferFile = filename.replace('.jpg', '.webp');
        const targetPath = path.resolve(destination, transferFile);
        await cwebp(paths, targetPath, '-q 80');
        const { size } = fs.statSync(targetPath);

        // Delete Origin File
        if (fs.existsSync(paths)) fs.unlinkSync(paths);

        return {
          ...v,
          size,
          filename: transferFile,
          path: targetPath,
        };
      }));
    }));
    req.files = payload;
    next();
  }
}

export default new UploadMiddleware();
