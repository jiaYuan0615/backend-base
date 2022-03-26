/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import randomstring from 'randomstring';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

class GlobalService {
  /** 計算 Token 到期時間
   *
   * @param {object} token
   * @returns {boolean}
   */
  calculateTokenTime = (token) => {
    const { expireTime } = token;
    const currentTime = new Date().getTime();
    if (currentTime > expireTime) return false;
    return true;
  };

  /** 計算分頁資訊
   *
   * @param {number} limit
   * @param {number} page
   * @returns {object}
   */
  calculatePagination = (limit = 10, page = 1) => {
    const offset = (page - 1) * limit;
    const pagination = {
      limit: _.toNumber(limit),
      offset,
    };
    return pagination;
  };

  /** 產生亂數字串
   *
   * @param {number} length
   * @param {string} charset
   * @returns {string}
   */
  yieldRandomString = (length = 11, charset = 'alphanumeric') => {
    const random = randomstring.generate({
      length,
      charset,
    });
    return random;
  };

  /**
   *
   * @param {string} folder
   * @param {string} middlewareFolder
   * @returns {Array}
   */
  yieldRoutePath = (folder, middlewareFolder = null) => {
    const payload = [];
    let middleware;
    fs.readdirSync(folder)
      .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
      .forEach((file) => {
        const controller = require(path.resolve(folder, file)).default;
        payload.push({
          route: `/${file.replace('.js', '')}`,
          controller,
        });
      });
    if (middlewareFolder) {
      fs.readdirSync(middlewareFolder)
        .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js') && (file.indexOf('admin') > -1))
        .forEach((file) => {
          middleware = require(path.resolve(middlewareFolder, file)).default;
        });
      return _.map(payload, (x) => ({
        ...x,
        route: `/private${x.route}`,
        middleware,
      }));
    }
    return payload;
  }
}

export default new GlobalService();
