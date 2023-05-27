const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;
const { hashPassword } = require('./helpers/hashPassword');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  console.log('email:', email) 
  console.log('password:', password)
  // match credentials from what is in the request to what is in db
  // return user is credentials match
  res.json('successfully signed in') 
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const hashedPass = hashPassword(password);
  // store in db
  // return new user
  res.json('successfully registered') 
})

app.listen(port, () => {
  console.log(`Panda server listening on port ${port}`)
});
