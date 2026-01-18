const express = require('express');
const { makeInvoker } = require('awilix-express');
const { requireUserAuth } = require('../middleware/authentication');

const router = express.Router();
const api = makeInvoker(({ userController }) => userController);

router.get('/:id', requireUserAuth, api('findMe'));

module.exports = { userRoutesV1: router };
