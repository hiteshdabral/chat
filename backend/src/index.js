const express = require('express');
const { scopePerRequest } = require('awilix-express');
const { connectDB } = require('../src/singletons/sequelizeDb');
const container = require('./singletons/awilixContainer');
const router = require('./routes');

const app = express();

// Convert parse http json data , and put it into req.body
app.use(express.json());

connectDB();

// this creates req.container for every req
app.use(scopePerRequest(container));

// register router after scoped per req
router(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
