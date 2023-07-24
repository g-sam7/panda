const express = require('express');

const signinRouter = express.Router();
const { signinController } = require('../controllers/signin.controller');

module.exports = (client) => {
  signinRouter.post('/', signinController(client));
  return signinRouter;
};