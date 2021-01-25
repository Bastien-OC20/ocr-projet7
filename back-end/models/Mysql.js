const mysql = require('mysql2');
require ('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'groupomania_social_media'
});

module.exports = connection;