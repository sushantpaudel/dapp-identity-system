'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('update_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      itemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      tableName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      columnName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      oldValue: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      newValue: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('update_logs');
  },
};
