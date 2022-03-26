import { Router } from 'express';
import _ from 'lodash';
import path from 'path';

import GlobalService from '../services/global';

const router = Router();

const publicFolder = path.resolve(__dirname, './public');
const publicPath = GlobalService.yieldRoutePath(publicFolder);

const privateFolder = path.resolve(__dirname, './private');
// 預設情況為使用者與管理者表分開
const middlewareFolder = path.resolve(__dirname, '../middlewares');
const privatePath = GlobalService.yieldRoutePath(privateFolder, middlewareFolder);

/**
 * public
 */
publicPath.map((data) => {
  const { route, controller } = data;
  return _.isUndefined(controller) ? null : router.use(route, controller);
});

/**
 * private
 */
privatePath.map((data) => {
  const { route, controller, middleware } = data;
  return _.isUndefined(controller) ? null : router.use(route, middleware.authenticate, controller);
});

export default router;
