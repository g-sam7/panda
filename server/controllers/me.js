const me = (client) => async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not signed in' });
  }
  
  const getUserFromDatabase = async (userId) => {
    const findUserText = 'SELECT * FROM users WHERE id = $1';
    const values = [userId];
    try {
      const userQueryResult = await client.query(findUserText, values);
      return userQueryResult.rows[0];
    } catch (err) {
      console.error('Error executing query', err.stack);
      return null;
    }
  };
  
  try {
    getUserFromDatabase(req.session.userId)
    .then(user => {
      if (!user) {
        return res.status(500).json({ error: 'User not found' });
      }
      delete user.password;
      res.json(user);
    })
    .catch(err => res.status(500).json({ error: 'Error occurred:', err }));
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ error: 'Error occurred' });
  }
}

module.exports = { me };
