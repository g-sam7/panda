const { hashPassword } = require('../helpers/hashPassword');

const register = (client) => async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPass = await hashPassword(password);
    const insertUserText = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *';
    const values = [username, email, hashedPass];

    client.query(insertUserText, values, (err, queryResult) => {
      if (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: 'An error occurred while registering user' });
      } else {
        const user = queryResult.rows[0];
        delete user.password;
        req.session.userId = user.id;
        res.status(200).json(user);
      }
    });
  } catch (err) {
    console.error('Error hashing password', err.stack);
    res.status(500).json({ error: 'An error occurred while hashing password' });
  }
}


module.exports = { register };
