/* eslint-disable no-unused-expressions */
import randomstring from 'randomstring';
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
}

export default new GlobalService();
