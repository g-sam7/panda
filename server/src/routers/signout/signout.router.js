const express = require('express');

const signoutRouter = express.Router();
const { signoutController } = require('./signout.controller');

module.exports = () => {
  signoutRouter.post('/', signoutController);
  return signoutRouter;
};