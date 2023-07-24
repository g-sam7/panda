const express = require('express');

const meRouter = express.Router();
const { meController } = require('../controllers/me.controller');

module.exports = (client) => {
  meRouter.get('/', meController(client));
  return meRouter;
};