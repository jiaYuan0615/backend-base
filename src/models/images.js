export default (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    id: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    originalname: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.INTEGER,
    },
    mimetype: {
      type: DataTypes.STRING,
    },
    path: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'images',
    timestamps: true,
    freezeTableName: true,
  });
  return images;
};
