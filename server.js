require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors')
const port = 5000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.HOST_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Db bridge connected 😊 ✅");
  })
  .catch((err) => {
    console.log("Failed to connect to db : " + err.message);
  });



const skuRoutes = require('./routes/skuRoutes');
const linksRoutes = require('./routes/linksRoutes');
const scriptRoutes = require('./routes/scriptRoutes');
const userRoutes = require('./routes/userRoutes');

const utopyaLinksRoutes = require('./routes/utopyaLinksRoutes');
const mobilaxLinksRoutes = require('./routes/mobilaxLinksRoutes');

app.use('/sku', skuRoutes);
app.use('/links', linksRoutes);
app.use('/script', scriptRoutes);
app.use('/utopya', utopyaLinksRoutes);
app.use('/mobilax', mobilaxLinksRoutes);
app.use('/users', userRoutes);


app.listen(port, () => console.log('Serveur ouvert sur le port : ' + port))