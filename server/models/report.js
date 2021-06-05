'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  report.init(
    {
      isDeleted: DataTypes.BOOLEAN,
      isActive: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      query: DataTypes.TEXT,
      reportType: DataTypes.STRING,
      sequence: DataTypes.INTEGER,
      colSize: DataTypes.INTEGER,
      styles: DataTypes.JSON,
      options: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'report',
    },
  );
  return report;
};
