'use strict';

/**
 * You can take this reference and make other triggers for upcoming tables
 * CHANGE: tableName
 * Add insert query one by one for any other column you want to audit the change.
 *
 */
const tableName = 'users';
const updateQuery = (tableName, columnName) => {
  return `
    IF NEW.${columnName} != OLD.${columnName} THEN 
      INSERT INTO update_logs(userId, itemId, tableName, columnName, oldValue, newValue, updatedAt) VALUES (NEW.editedBy, NEW.id, '${tableName}', '${columnName}', OLD.${columnName}, NEW.${columnName}, NOW()); 
    END IF;`;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
        CREATE TRIGGER ${tableName}_update AFTER UPDATE ON ${tableName}
        FOR EACH ROW BEGIN
            ${updateQuery(tableName, 'email')}
            ${updateQuery(tableName, 'username')}
            ${updateQuery(tableName, 'firstName')}
            ${updateQuery(tableName, 'lastName')}
            ${updateQuery(tableName, 'phoneNumber')}
            ${updateQuery(tableName, 'status')}
            ${updateQuery(tableName, 'loginAttempts')}
          END;
     `);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER ${tableName}_update`);
  },
};
