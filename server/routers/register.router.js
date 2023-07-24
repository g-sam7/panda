const express = require('express');

const registerRouter = express.Router();
const { registerController } = require('../controllers/register.controller');

module.exports = (client) => {
  registerRouter.post('/', registerController(client));
  return registerRouter;
};
