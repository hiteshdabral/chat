const express = require('express');

const authRoutesV1 = express.Router();

authRoutesV1.post('/login');

module.exports = { authRoutesV1 };
