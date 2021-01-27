const mysql = require('mysql');
const dotenv = require("dotenv");

dotenv.config({path: './.env'});
const NAME = process.env.DB_USER;

const HOST = process.env.DB_HOST;

//Connexion à la base de donnée Mysql

const db = mysql.createConnection({
    host     : HOST,
    user     : NAME,
    
    database: 'groupomania'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté a mysql avec l \'id '  + db.threadId);
});


module.exports = db;