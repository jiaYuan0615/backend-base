import _ from 'lodash';
import env from './env';

const {
  DatabaseUsername,
  DatabasePassword,
  Database,
  DatabaseHost,
  DatabasePort,
  DatabaseDialect,
  DatabaseLogging,
  DatabaseOperator,
} = env;

const logging = _.isEqual(_.lowerCase(DatabaseLogging), 'true');

module.exports = {
  development: {
    username: DatabaseUsername,
    password: DatabasePassword,
    database: Database,
    host: DatabaseHost,
    port: _.toNumber(DatabasePort),
    dialect: DatabaseDialect,
    logging,
    operatorsAliases: DatabaseOperator,
  },
  test: {
    username: DatabaseUsername,
    password: DatabasePassword,
    database: Database,
    host: DatabaseHost,
    port: _.toNumber(DatabasePort),
    dialect: DatabaseDialect,
    logging,
    operatorsAliases: DatabaseOperator,
  },
  production: {
    username: DatabaseUsername,
    password: DatabasePassword,
    database: Database,
    host: DatabaseHost,
    port: _.toNumber(DatabasePort),
    dialect: DatabaseDialect,
    logging,
    operatorsAliases: DatabaseOperator,
  },
};
