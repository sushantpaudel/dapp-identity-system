'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerificationCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  VerificationCode.init(
    {
      isUsed: DataTypes.BOOLEAN,
      type: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      expiryDate: DataTypes.DATE,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'verification_code',
    },
  );
  return VerificationCode;
};
