import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import Sequelize from 'sequelize';
import DatabaseService from '../services/database';

const basename = path.basename(__filename);
const sequelize = DatabaseService.connect();
const db = {};
fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = _.invoke(sequelize, 'import', path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
