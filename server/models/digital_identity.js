'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class digital_identity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  digital_identity.init(
    {
      isDeleted: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      citizenshipNumber: DataTypes.STRING,
      publicKey: DataTypes.STRING,
      privateKey: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'digital_identity',
    },
  );
  return digital_identity;
};
