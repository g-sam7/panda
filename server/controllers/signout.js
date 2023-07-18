const signout = (req, res) => {
  // Destroy the session
  console.log('sign out', req.session);
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while signing out' });
    }
    console.log('User signed out successfully');
    console.log('sign out destroyed session:', req.session);
    return res.status(200).json({ success: true });
  });
};

module.exports = { signout };
