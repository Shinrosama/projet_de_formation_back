const { ValidationError } = require('sequelize')
const { Rating, User } = require('../db/sequelizeSetup')

const findAllRatings = (req, res) => {
    Rating.findAll({ include: User })
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findRatingByPk = (req, res) => {
    return res.json({ message: `find by pk` })
}

const createRating = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `Utilisateur non trouvé.` })
            }
            return Rating.create({ ...req.body, UserId: user.id })
                .then(result => {
                    res.json({ message: `Commentaire créé.`, data: result })
                })
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        })
}

const updateRating = (req, res) => {
    Rating.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: 'La note a bien été mis à jour.', data: result })
                    })
            } else {
                res.status(404).json({ message: `Aucune note à mettre à jour n'a été trouvé.` })
            }
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const deleteRating = (req, res) => {
    Rating.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.destroy()
                    .then((result) => {
                        res.json({ mesage: `La note a bien été supprimé.`, data: result })
                    })
            } else {
                res.status(404).json({ mesage: `Aucune note trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
        })
}

module.exports = { findAllRatings, findRatingByPk, createRating, updateRating, deleteRating }










