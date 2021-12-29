import passport from './passport';
// import AuthenticateService from '../services/authenticate';

class AdminMiddleware {
  // loginAuthenticate = async (req, res, next) => {
  //   passport.authenticate('admin', { session: false }, async (error, admin) => {
  //     if (error) {
  //       const { status, message } = error;
  //       res.status(status).json({ message });
  //       return;
  //     }
  //     if (!admin) {
  //       res.status(400).json({ message: '登入失敗' });
  //       return;
  //     }
  //     const payload = AuthenticateService.yieldPayload(admin);
  //     const token = AuthenticateService.yieldToken(payload);
  //     res.status(200).json({ message: '登入成功', token });
  //   })(req, res, next);
  // }

  authenticate = (req, res, next) => {
    passport.authenticate('adminJWT', { session: false }, async (error, admin, info) => {
      if (info) {
        res.status(401).json({ message: '請於登入後繼續' });
        return;
      }
      if (error) {
        const { status, message } = error;
        res.status(status).json({ message });
        return;
      }
      req.id = admin.id;
      next();
    })(req, res, next);
  };
}

export default new AdminMiddleware();
