const fs = require('fs');
const path = require('path');

module.exports = ({ sequelize }) => {
  const models = {};

  fs.readdirSync(__dirname)
    .filter((file) => file.endsWith('.model.js'))
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize);
      console.log('model', model);
      models[model.name] = model;
    });

  Object.values(models).forEach((model) => {
    if (model.associate) model.associate(models);
  });

  console.log(models);
  return models;
};
