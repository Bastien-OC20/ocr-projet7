const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// Helmet (sécurise les appli Express en définissant divers en-têtes HTTPP, protège contre les failles XSS//
const helmet = require('helmet');
const cors = require('cors');

//environnement variables//
require('dotenv').config()


const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');
const adminRoutes = require('./routes/admin');
const path = require('path');

//DB connection//
require("./Database/dbConnexion");


app.use(helmet());
app.use(cors());


/* CROSS ORIGIN RESOURCE SHARING CORS*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(
    bodyParser.urlencoded({ extended : false })
)
/* .json - bodyParser transforme le corps de la requête en objet JS*/
app.use(bodyParser.json());



//  ENDPOINTS CHEMIN D'ACCES //
app.use('/api/auth', userRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;