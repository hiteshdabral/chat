const { sequelize } = require('../singletons/sequelizeDb');
const loadModels = require('../models');

// Load models
const models = loadModels({ sequelize });

// Import repository factories
const userRepositoryFactory = require('../repositories/userRepository');

// Import service factories
const userServiceFactory = require('./userService');

// Create repository instances
const userRepository = userRepositoryFactory({ models });

// Create service instances
const userService = userServiceFactory({ userRepository });

// Export all services
module.exports = {
  userService,
  // Add more services here as needed
};
