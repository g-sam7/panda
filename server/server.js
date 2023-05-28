const express = require('express');
const app = express();
const cors = require('cors');

require ('dotenv').config();
console.log(process.env)
const { Pool }  = require ('pg');

const {
POSTGRES_HOST,
POSTGRES_DB,
POSTGRES_USER,
POSTGRES_PASSWORD
} = process.env

const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});

const port = process.env.PORT || 3000;
const { hashPassword } = require('./helpers/hashPassword');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
  client.query('SELECT * FROM users', (err, queryResult) => {
    if (err) {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    } else {
      console.log(queryResult.rows);
      res.status(200).json(queryResult.rows);
    }
  });
});



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
