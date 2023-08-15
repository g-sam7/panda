const express = require('express');

const registerRouter = express.Router();
const { registerController } = require('./register.controller');

module.exports = (client) => {
  registerRouter.post('/', registerController(client));
  return registerRouter;
};
