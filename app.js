const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require("morgan");
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const apiRouter = require('./routes/api.router');
const initializeAuth = require('./initializeAuth');

app = express();

/*const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Libanga-Dediace API',
            description: '.',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.router.js'],
};

const swaggerDoc = swaggerJsdoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(compression());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connexion à MongoDB réussie !');
        initializeAuth();

        app.use('/public', express.static(path.join(__dirname, 'public')));
        app.use('/profils', express.static(path.join(__dirname, 'profils')));

        app.use('/api', apiRouter);
    })
    .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app;