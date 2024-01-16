// Import des modèles de données
const MangaModel = require('../models/mangaModel');
const UserModel = require('../models/userModel');
const ReviewModel = require('../models/reviewModel');
const { Sequelize, DataTypes } = require('sequelize');
const roleModel = require('../models/roleModel');
const { setRoles, setUsers, setMangas } = require('./setDataSample');


// Configuration de la connexion à la base de données MariaDB
const sequelize = new Sequelize('manga_note', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    // Désactive les journaux de requêtes SQL dans la console
    logging: false 
});

// Définition des modèles
const Role = roleModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Manga = MangaModel(sequelize, DataTypes);
const Review = ReviewModel(sequelize, DataTypes);

// Définition des relations entre les modèles
Role.hasMany(User);
User.belongsTo(Role);

User.hasMany(Manga);
Manga.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Manga.hasMany(Review);
Review.belongsTo(Manga);

// Synchronisation de la base de données avec création des tables
sequelize.sync({ force: true })
    .then(async () => {
        // Initialisation des rôles, utilisateurs et mangas 
        await setRoles(Role);
        await setUsers(User);
        await setMangas(Manga);
    })
    .catch(error => {
        console.log(error);
    });

// Vérification de la connexion à la base de données
sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`));

// Export des modèles pour une utilisation dans d'autres parties de l'application
module.exports = { Manga, User, Role, Review };
