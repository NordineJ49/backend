// importe le module Express
const express = require('express');


// importe le module mongoose
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')

// process.env + nom de la variable
mongoose.connect('mongodb+srv://NordineJ:blabla49@cluster0.xwwpyzo.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// const app qui utilise express() pour gerer les routes et les middlewares (app.use etc ...)
const app = express();

// methode use de l'appli express pour ajouter un middleware express.json(), qui permet de traiter les données envoyées au serveur dans un format JSON

// methode use de l'appli express pour ajouter un middlkeware qui permet de definir les headers pour gérer les problèmes d'accès lié a la sécurité
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json())

app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)

// objet module de node qui exporte la variable app (express())
module.exports = app;