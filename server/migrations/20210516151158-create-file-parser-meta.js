'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('file_parser_meta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      name: {
        type: Sequelize.STRING(50),
      },
      key: {
        type: Sequelize.STRING(20),
      },
      filePath: {
        type: Sequelize.TEXT,
        comment: 'meta-data/file-parser/<respective-file-name>',
      },
      type: {
        type: Sequelize.INTEGER,
        comment: '1 -> excel, 2 -> zip',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('file_parser_meta');
  },
};
