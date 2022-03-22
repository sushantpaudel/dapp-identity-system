'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('digital_identities', 'address', {
      type: Sequelize.STRING,
      after: 'citizenshipNumber',
    });
    await queryInterface.addColumn('digital_identities', 'phoneNumber', {
      type: Sequelize.STRING,
      after: 'address',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('digital_identities', 'address');
    await queryInterface.removeColumn('digital_identities', 'phoneNumber');
  },
};
