const express = require('express');
// Middleware pour la journalisation des requêtes HTTP
const morgan = require('morgan');
// Middleware pour gérer les autorisations d'accès depuis différentes sources
const cors = require("cors"); 

const app = express();
const port = 3005;

// Middleware pour traiter les données au format JSON
app.use(express.json());

// Middleware pour gérer les autorisations CORS
app.use(cors());

// Middleware pour la journalisation en mode développement
app.use(morgan('dev'));

// Route de base renvoyant "Hello World !" en réponse à une requête GET
app.get('/', (req, res) => {
    res.json('Hello World !');
});

// Import des routes définies dans les fichiers mangaRoutes, userRoutes, et reviewRoutes
const mangaRouter = require('./routes/mangaRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// Utilisation des routes importées
app.use('/api/mangas', mangaRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

// Middleware pour servir des images statiques depuis le répertoire '/images'
app.use('/images', express.static(__dirname + '/images'));

// L'application écoute sur le port défini
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
