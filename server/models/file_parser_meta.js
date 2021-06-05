'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class file_parser_meta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  file_parser_meta.init(
    {
      name: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      key: DataTypes.STRING,
      filePath: DataTypes.TEXT,
      type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'file_parser_meta',
      timestamps: false,
    },
  );
  file_parser_meta.TYPE_EXCEL = 1;
  file_parser_meta.TYPE_ZIP = 2;
  return file_parser_meta;
};
