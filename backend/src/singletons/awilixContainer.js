const { createContainer, asValue, asFunction, Lifetime } = require('awilix');
const { sequelize } = require('./sequelizeDb');
const loadModels = require('../models');

const container = createContainer();

// Registering singletons
container.register({
  // We use asValue for sequelize because it is already
  // an instantiated object (new Sequelize(...) has already run).
  // We just want to share this exact same instance across the app,
  // not create a new one.
  sequelize: asValue(sequelize),

  // We use asFunction for models because loadModels is a function
  // that initializes and returns all models (usually by attaching them to sequelize).
  // .singleton() ensures this function runs only once,
  // so the same models instance is shared across the entire app.
  models: asFunction(loadModels).singleton(),
});

// Auto load repositories, services, and controllers
container.loadModules(['src/repositories/*.js', 'src/services/*.js', 'src/controllers/*.js'], {
  resolverOptions: {
    // SCOPED means a new instance will be created per request scope.
    // This prevents shared mutable state between different requests.
    // Useful for repositories/services that may hold request-level data.
    lifetime: Lifetime.SCOPED,
  },
  formatName: (name) => {
    console.log('Registering:', name);
    return name;
  },
});

module.exports = container;
