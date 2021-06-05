'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class excel_export extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  excel_export.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      filePath: DataTypes.TEXT,
      fileType: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: 'excel_export',
    },
  );
  return excel_export;
};
