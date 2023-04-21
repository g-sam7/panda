const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const ERROR_HASHING_PASSWORD = 'Error hashing password';

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error(`${ERROR_HASHING_PASSWORD}: ${error.message}`);
  }
};

module.exports = {
  hashPassword,
};
