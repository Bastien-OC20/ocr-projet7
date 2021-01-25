const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const connection = require('./models/Mysql');


const publicationsRoutes = require('./routes/publications');

connection.connect(error => {
    if(error) {
        throw error;
    } else {
        console.log('Successfuly connected to the database.');
    };
});

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/post', publicationsRoutes);

module.exports = app;