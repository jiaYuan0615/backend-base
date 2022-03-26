const env = {
  Env: process.env.APP_ENV,
  Host: process.env.APP_HOST,
  Port: process.env.APP_PORT,
  Protocol: process.env.APP_PROTOCOL,
  AppKey: process.env.APP_KEY,
  DatabaseHost: process.env.DB_HOST,
  Database: process.env.DB_DATABASE,
  DatabasePort: process.env.DB_PORT,
  DatabaseDialect: process.env.DB_DIALECT,
  DatabaseUsername: process.env.DB_USERNAME,
  DatabasePassword: process.env.DB_PASSWORD,
  DatabaseLogging: process.env.DB_LOGGING,
  DatabaseOperator: process.env.DB_OPERATOR,
  JWTExpireTime: process.env.JWT_EXPIRE,
  FacebookLogin: process.env.FB_CLIENT_ID,
  FacebookLoginSecret: process.env.FB_CLIENT_SECRET,
  GoogleLogin: process.env.GOOGLE_CLIENT_ID,
  GoogleLoginSecret: process.env.GOOGLE_CLIENT_SECRET,
};

export default env;
