export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('images', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
    },
    originalname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    size: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    mimetype: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    path: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('images');
}
