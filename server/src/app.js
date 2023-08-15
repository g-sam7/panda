const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const { Pool } = require('pg');
const path = require('path');

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

const registerRouter = require('./routers/register/register.router')(client);
const meRouter = require('./routers/me/me.router')(client);
const signinRouter = require('./routers/signin/signin.router')(client);
const signoutRouter = require('./routers/signout/signout.router')();

const app = express();

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.use('/register', registerRouter);
app.use('/me', meRouter);
app.use('/signin', signinRouter);
app.use('/signout', signoutRouter);

module.exports = app;
