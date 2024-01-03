
const MangaModel = require('../models/mangaModel')
const UserModel = require('../models/userModel')
const RatingModel = require('../models/ratingModel')
const ReviewModel = require('../models/reviewModel')
const { Sequelize, DataTypes } = require('sequelize');
const roleModel = require('../models/roleModel');
const { setRoles, setUsers, setMangas } = require('./setDataSample');


const sequelize = new Sequelize('manga_note', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const Role = roleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Manga = MangaModel(sequelize, DataTypes)
const Review = ReviewModel(sequelize, DataTypes)
const Rating = RatingModel(sequelize, DataTypes)

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Review)
Review.belongsTo(User)

Manga.hasMany(Review)
Review.belongsTo(Manga)

User.belongsToMany(Manga, { through: Rating });
Manga.belongsToMany(User, { through: Rating });

sequelize.sync({ force: true })
    .then(async () => {
        await setRoles(Role)
        await setUsers(User)
        await setMangas(Manga)
      
     
    })
    .catch(error => {
        console.log(error)
    })

    sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = { Manga, User, Role, Review, Rating }
