const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
//DB connection//
require("../Database/dbConnexion");
const db = {};



fs
.readdirSync(__dirname)
.filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
if (db[modelName].associate) {
  db[modelName].associate(db);
}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.users = require("./users.js")(sequelize, Sequelize)
db.messages = require("./messages.js")(sequelize, Sequelize)
db.comments = require("./comments.js")(sequelize, Sequelize)

db.comments.belongsTo(db.messages)
db.comments.belongsTo(db.users)
db.messages.hasMany(db.comments)
db.messages.belongsTo(db.users)
db.users.hasMany(db.messages)
db.users.hasMany(db.comments)


module.exports = db;