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
    console.log("Db bridge connected 😊 ✅");
  })
  .catch((err) => {
    console.log("Failed to connect to db : " + err.message);
  });



const skuRoutes = require('./routes/skuRoutes');
const linksRoutes = require('./routes/linksRoutes');
const scriptRoutes = require('./routes/scriptRoutes');

app.use('/sku', skuRoutes);
app.use('/links', linksRoutes);
app.use('/script', scriptRoutes);


app.listen(port, () => console.log('Serveur ouvert sur le port : ' + port))