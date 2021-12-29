import bcrypt from 'bcrypt';

class PasswordService {
  /** 密碼加密
   *
   * @param {string} password
   * @returns {string}
   */
  hash = (password) => {
    const salt = 10;
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  /** 比對密碼
   *
   * @param {string} plain
   * @param {string} hash
   * @returns {boolean}
   */
  compareHash = (plain, hash) => bcrypt.compareSync(plain, hash);
}

export default new PasswordService();
