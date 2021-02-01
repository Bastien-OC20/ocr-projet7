const Sequelize = require('sequelize')
const db = {}
const database = require('../models');
const sequelize = new Sequelize("groupomania", "root", "", {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

database.sequelize
  .authenticate()
  .then(() => {
    console.log('Bien ! tout me semble bon ');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

module.exports = db