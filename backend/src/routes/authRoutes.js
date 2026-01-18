const express = require('express');
const { makeInvoker } = require('awilix-express');
const { requireUserAuth } = require('../middleware/authentication');

const router = express.Router();
const api = makeInvoker(({ authController }) => authController);

router.post('/register', api('register'));
router.post('/login', api('login'));
router.post('/logout', requireUserAuth, api('logout'));

module.exports = { authRoutesV1: router };
