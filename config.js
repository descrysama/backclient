const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(process.env.MARIADB_DATABASE_NAME, process.env.MARIADB_USERNAME, process.env.MARIADB_PASSWORD, {
  host: process.env.MARIADB_HOST,
  port: process.env.MARIADB_PORT,
  dialect: 'mariadb',
  modelPaths: [path.resolve(__dirname, 'Models')],
  logging: false,
  
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectToDatabase();