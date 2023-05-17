require('dotenv').config();
const express = require('express');
require('./config.js')
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors')
const port = 5000;
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  }));
app.use(express.json());




app.listen(port, () => console.log('Serveur ouvert sur le port : ' + port))