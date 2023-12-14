const MangaModel = require('../models/mangaModel')
const UserModel = require('../models/userModel')
const RatingModel = require('../models/ratingModel')
const ReviewModel = require('../models/reviewModel')
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('manga_note', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const Role = RoleModel(sequelize, DataTypes)
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










