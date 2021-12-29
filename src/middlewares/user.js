// import _ from 'lodash';
import passport from './passport';

class UserMiddleware {
  // loginAuthenticate = async (req, res, next) => {
  //   passport.authenticate('local', { session: false }, async (error, user) => {
  //     if (error) {
  //       const { status, message } = error;
  //       res.status(status).json({ message });
  //       return;
  //     }
  //     if (!user) {
  //       res.status(400).json({ message: '登入失敗' });
  //       return;
  //     }
  //     const payload = AuthenticateService.yieldPayload(user);
  //     const token = AuthenticateService.yieldToken(payload);
  //     res.status(200).json({ message: '登入成功', token });
  //   })(req, res, next);
  // }

  authenticate = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (error, user, info) => {
      if (info) {
        res.status(401).json({ message: '尚未登入' });
        return;
      }
      if (error) {
        const { status, message } = error;
        res.status(status).json({ message });
        return;
      }
      req.id = user.id;
      next();
    })(req, res, next);
  };

  /** FB 登入
   *
   */
  // facebookAuthenticate = (req, res, next) => {
  //   passport.authenticate('facebook', { scope: 'email', session: false },
  //     async (err, profile) => {
  //       try {
  //         // profile
  //         // res.redirect();
  //       } catch (error) {
  //         // res.redirect();
  //       }
  //     })(req, res, next);
  // };

  /** Google 登入
   *
   */
  // googleAuthenticate = (req, res, next) => {
  //   passport.authenticate('google', { scope: ['email', 'profile'], session: false },
  //     async (err, profile) => {
  //       try {
  //         // profile
  //         // res.redirect();
  //       } catch (error) {
  //         // res.redirect();
  //       }
  //     })(req, res, next);
  // };
}

export default new UserMiddleware();
