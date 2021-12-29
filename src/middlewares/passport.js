// import _ from 'lodash';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import FacebookStrategy from 'passport-facebook';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import LocalStrategy from 'passport-local';
import env from '../config/env';
import GlobalService from '../services/global';
// import config from '../config';
// import PasswordService from '../services/password';

/**
 * JWT 設定
 */
const options = {
  secretOrKey: env.AppKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

/**
 * FB 第三方登入
 */
// passport.use(new FacebookStrategy({
//   clientID: env.FacebookLogin,
//   clientSecret: env.FacebookLoginSecret,
//   callbackURL: `${config.path}/api/auth/facebook/callback`,
//   // must on 443 port that can be work normally
//   // callbackURL: 'https://localhost/api/auth/facebook/callback',
//   profileFields: ['id', 'displayName', 'emails'],
// }, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

/**
 * Google 第三方登入
 */
// passport.use(new GoogleStrategy({
//   clientID: env.GoogleLogin,
//   clientSecret: env.GoogleLoginSecret,
//   callbackURL: `${config.path}/api/auth/google/callback`,
//   scope: ['https://www.googleapis.com/auth/userinfo.profile', 'openid'],
// }, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

/**
 * Admin Login
 */
passport.use('admin', new LocalStrategy(async (username, password, callback) => {
  const admin = { username: 'mock', password: 'password' };
  // const admin = await AdminService.getAdminByName(username);
  // if (!admin) return callback({ status: 404, message: '找不到此管理者' }, false);
  // const passwordCheck = PasswordService.compareHash(password, admin.password);
  // if (!passwordCheck) return callback({ status: 400, message: '輸入的密碼有誤' }, false);
  return callback(null, admin);
}));

/**
 * Admin Login Authenticate
 */
passport.use('adminJWT', new JwtStrategy(options, async (payload, callback) => {
  const status = GlobalService.calculateTokenTime(payload);
  if (!status) return callback({ status: 401, message: '請重新登入' }, false);
  return callback(null, payload);
}));

/**
 * User Login
 */
passport.use(new LocalStrategy(async (username, password, callback) => {
  const admin = { username: 'mock', password: 'password' };
  // const admin = await AdminService.getAdminByName(username);
  // if (!admin) return callback({ status: 404, message: '找不到此管理者' }, false);
  // const passwordCheck = PasswordService.compareHash(password, admin.password);
  // if (!passwordCheck) return callback({ status: 400, message: '輸入的密碼有誤' }, false);
  return callback(null, admin);
}));

/**
 * User Login Authenticate
 */
passport.use(new JwtStrategy(options, async (payload, callback) => {
  const status = GlobalService.calculateTokenTime(payload);
  if (!status) return callback({ status: 401, message: '請重新登入' }, false);
  return callback(null, payload);
}));

export default passport;
