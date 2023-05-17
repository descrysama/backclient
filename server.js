require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const port = 5000;


app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
}));
app.use(express.json());

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });



const skuRoutes = require('./routes/skuRoutes');
const linksRoutes = require('./routes/linksRoutes');

app.use('/sku', skuRoutes);
app.use('/links', linksRoutes);


app.listen(port, () => console.log('Serveur ouvert sur le port : ' + port))