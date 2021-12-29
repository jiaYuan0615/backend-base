import env from './config/env';

export default {
  path: `${env.Protocol}://${env.Host}${env.Port && `:${env.Port}`}`,
};
