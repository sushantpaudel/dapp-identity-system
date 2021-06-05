'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class update_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  update_log.init(
    {
      userId: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
      tableName: DataTypes.STRING,
      columnName: DataTypes.STRING,
      oldValue: DataTypes.STRING,
      newValue: DataTypes.STRING,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'update_log',
      timestamps: false,
    },
  );
  return update_log;
};
