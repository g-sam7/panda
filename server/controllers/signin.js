const bcrypt = require('bcrypt');

const signin = (client) => async (req, res) => {
  const { email, password } = req.body;

  // SQL command to find a user with the provided email
  const findUserText = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  try {
    const userQueryResult = await client.query(findUserText, values);

    // If no user found, return an error
    if (userQueryResult.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userQueryResult.rows[0];
    
    // Compare provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);

    // If passwords do not match, return an error
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Remove password field from user
    delete user.password;

    // If everything is okay, return the user
    return res.status(200).json(user);

  } catch (err) {
    console.error('Error executing query', err.stack);
    return res.status(500).json({ error: 'An error occurred while signing in' });
  }
};

module.exports = { signin };
