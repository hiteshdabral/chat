const { createContainer, asValue, asFunction, Lifetime } = require('awilix');
const { sequelize } = require('./sequelizeDb');
const loadModels = require('../models');

const container = createContainer();

// Registering singletons
container.register({
  sequelize: asValue(sequelize),
  models: asFunction(loadModels).singleton(),
});

// Auto load repositories, services, and controllers
container.loadModules(['src/repositories/*.js', 'src/services/*.js', 'src/controllers/*.js'], {
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
  formatName: (name) => {
    console.log('Registering:', name);
    return name;
  },
});

module.exports = container;
