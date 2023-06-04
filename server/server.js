const express = require('express');
const app = express();
const cors = require('cors');

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

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const { register } = require('./controllers/register');
const { signin } = require('./controllers/signin');

app.get('/', (req, res) => { res.send("Success!") });
app.post('/register', register(client));
app.post('/signin', signin(client));

app.listen(port, () => {
  console.log(`Panda server listening on port ${port}`)
});
