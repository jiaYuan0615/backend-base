/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import paths from 'path';
import ImageService from '../services/image';
import config from '../config';

const notFoundImage = paths.resolve(__dirname, '../../storage/404.png');

class ImageController {
  getImage = async (req, res) => {
    const { id } = req.params;
    try {
      const { path } = await ImageService.getImage(id);
      if (!fs.existsSync(path)) throw new Error('找不到圖片');
      res.status(200).sendFile(path);
    } catch (error) {
      res.status(200).sendFile(notFoundImage);
    }
  }

  _postImage = async (req, res) => {
    const { file } = req;
    try {
      const imageId = await ImageService._postImage(file);
      const { filename } = file;
      // follow ckeditor instruction to give response
      const data = {
        filename,
        uploaded: 1,
        url: `${config.imagePath}${imageId}`,
      };
      res.status(200).json(data);
    } catch (error) {
      const { path } = file;
      if (file && fs.existsSync(path)) fs.unlinkSync(path);
      res.status(400).json({ message: '新增圖片失敗' });
    }
  }

  _deleteImage = async (req, res) => {
    const { id } = req.params;
    try {
      const { path } = await ImageService.getImage(id);
      if (!path) {
        res.status(404).json({ message: '找不到該圖片' });
        return;
      }
      if (fs.existsSync(path)) fs.unlinkSync(path);
      await ImageService._deleteImage(id);
      res.status(200).json({ message: '刪除圖片成功' });
    } catch (error) {
      res.status(400).json({ message: '刪除圖片失敗' });
    }
  }
}

export default new ImageController();
