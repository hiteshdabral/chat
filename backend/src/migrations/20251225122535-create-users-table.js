module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        required: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    console.log('Created user table');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
    console.log('Dropped users table successfullly');
  },
};
