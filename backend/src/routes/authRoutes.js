const express = require('express');
const { makeInvoker } = require('awilix-express');

const router = express.Router();
const api = makeInvoker(({ authController }) => authController);

router.post('/register', api('register'));
router.post('/login', api('login'));

module.exports = { authRoutesV1: router };
