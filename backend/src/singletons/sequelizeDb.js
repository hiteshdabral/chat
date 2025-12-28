const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'mydb', // database
  'chatuser', // username
  'chatpass', // password
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(' PostgreSQL connected');
  } catch (error) {
    console.error(' Unable to connect:', error);
    process.exit(1);
  }
}

module.exports = {
  sequelize,
  connectDB,
};
