const express = require('express');
const app = express();
const { register } = require('./controllers/register');
const { signin } = require('./controllers/signin');
const { signout } = require('./controllers/signout');
const { me } = require('./controllers/me');
const cors = require('cors');
const session = require('express-session');
require ('dotenv').config();
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

app.use(session({
  store: new (require('connect-pg-simple')(session))({
    pool: client,
    tableName: 'session'
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.get('/me', me(client));
app.post('/register', register(client));
app.post('/signin', signin(client));
app.post('/signout', signout);

app.listen(port, () => {
  console.log(`Panda server listening on port ${port}`)
});
