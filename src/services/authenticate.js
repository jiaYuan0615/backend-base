import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import env from '../config/env';

/**
 * 時間基數
 */
const timeHourBase = 60 * 60 * 1000;

class AuthenticateService {
  /** 產生JWT內容
   *
   * @param {object} param
   * @returns {object}
   */
  yieldPayload = (param) => {
    const payload = _.pick(param, ['id', 'name']);
    const expire = new Date().getTime() + env.JWTExpireTime * timeHourBase;
    return {
      ...payload,
      expire,
      jti: uuidv4(),
    };
  };

  /** Token 加密
   *
   * @param {object} token
   * @returns {string}
   */
  yieldToken = (token) => jwt.sign(token, env.AppKey);

  /** Token 解密
   *
   * @param {string} token
   * @returns {object}
   */
  decodeToken = (token) => {
    try {
      return jwt.verify(token, env.AppKey);
    } catch (error) {
      return false;
    }
  };
}

export default new AuthenticateService();
