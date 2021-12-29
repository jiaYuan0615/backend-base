/* eslint-disable import/prefer-default-export */
import env from '../../config/env';

export async function up(queryInterface) {
  const { database } = queryInterface.sequelize.config;
  switch (env.DatabaseDialect) {
    case 'mssql':
      await queryInterface.sequelize.query(`ALTER DATABASE ${database} COLLATE SQL_Latin1_General_CP1_CI_AS;`);
      break;
    default:
      await queryInterface.sequelize.query(`ALTER DATABASE ${database} CHARACTER SET utf8 COLLATE utf8_general_ci;`);
      break;
  }
}
