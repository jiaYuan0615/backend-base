import _ from 'lodash';
import { QueryTypes } from 'sequelize';
import models from '../models';

const { sequelize, images } = models;

class ImageService {
  /**
   * @param {string} id
   * @returns {object}
   */
  getImage = async (id) => {
    const query = `
    SELECT
      path
    FROM
      images
    Where
      id = :id`;
    const replacements = {
      id,
    };
    const [image] = await sequelize.query(query,
      {
        replacements,
        type: QueryTypes.SELECT,
      });
    return image;
  }

  /**
   *
   * @param {object} param
   * @returns {string}
   */
  _postImage = async (param) => {
    const payload = _.pick(param, ['originalname', 'size', 'path', 'mimetype']);
    const { id } = await images.create({ ...payload });
    return id;
  }

  /**
   *
   * @param {string} id
   * @returns {void}
   */
  _deleteImage = async (id) => {
    await images.destroy({
      where: {
        id,
      },
    });
  }
}

export default new ImageService();
