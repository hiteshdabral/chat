const { makeInvoker } = require('awilix-express');
const express = require('express');
const { requireUserAuth } = require('../middleware/authentication');

const router = express.Router();

const api = makeInvoker(({ workspaceController }) => workspaceController);

router.post('/', requireUserAuth, api('createWorkspace'));
router.put('/:id', requireUserAuth, api('updateWorkspace'));

module.exports = { workspaceRoutesV1: router };
