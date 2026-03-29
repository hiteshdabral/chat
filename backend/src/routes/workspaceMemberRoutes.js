const { makeInvoker } = require('awilix-express');
const express = require('express');
const { requireUserAuth } = require('../middleware/authentication');

const router = express.Router();

const api = makeInvoker(({ workspaceMemberController }) => workspaceMemberController);

router.get('/:workspaceId', requireUserAuth, api('fetchByWorkspace'));

module.exports = { workspaceMemberRoutesV1: router };
