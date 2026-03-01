const express = require('express');
const { makeInvoker } = require('awilix-express');
const { requireUserAuth } = require('../middleware/authentication');

const router = express.Router();

/*
  makeInvoker is used to resolve dependencies from the Awilix container
  for every request.

  ({ userController }) => userController

  This function receives the scoped container.
  Awilix injects dependencies based on registration name.
  Here we are extracting `userController` from the container
  and returning it.

  So now `api` becomes a helper function that can call methods
  from userController in a dependency-injected way.
*/
const api = makeInvoker(({ userController }) => userController);

router.get('/:id', requireUserAuth, api('findMe'));

module.exports = { userRoutesV1: router };
