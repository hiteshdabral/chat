'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'key', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('users', 'key_expiry', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'key');
    await queryInterface.removeColumn('users', 'key_expiry');
  },
};
