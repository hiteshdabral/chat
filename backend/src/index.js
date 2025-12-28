const express = require('express');
const { connectDB } = require('../src/singletons/sequelizeDb');
const router = require('./routes');

const app = express();

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

router(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
