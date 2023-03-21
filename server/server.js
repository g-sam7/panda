const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => { res.send("Success!") });
// app.post('/signin', signin.handleSignin(db, bcrypt));
// app.post('/register', register.handleRegister(db, bcrypt));

app.listen(port, () => {
  console.log(`Chat deck server listening on port ${port}`)
});