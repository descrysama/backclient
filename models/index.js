const { SequelizeAuto } = require('sequelize-auto');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.MARIADB_DATABASE_NAME, process.env.MARIADB_USERNAME, process.env.MARIADB_PASSWORD, {
  host: process.env.MARIADB_HOST,
  port: process.env.MARIADB_PORT,
  dialect: 'mariadb',
  logging: false,
  operatorsAliases: false
});

// const sequelizeauto = new SequelizeAuto(process.env.MARIADB_DATABASE_NAME, process.env.MARIADB_USERNAME, process.env.MARIADB_PASSWORD, {
//   host: process.env.MARIADB_HOST,
//   port: process.env.MARIADB_PORT,
//   dialect: 'mariadb',
//   logging: false,
//   operatorsAliases: false
// });

// sequelizeauto.run((err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Models generated successfully.');
//   }
// });

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.skus = require("./sku.js")(sequelize, Sequelize);
db.users = require("./users.js")(sequelize, Sequelize);
db.links = require("./links.js")(sequelize, Sequelize);
db.websitesScripts = require("./websites_scripts.js")(sequelize, Sequelize);
db.utopyaLinks = require("./utopya_links.js")(sequelize, Sequelize);
db.mobilaxLinks = require("./mobilax_links.js")(sequelize, Sequelize);

module.exports = db;