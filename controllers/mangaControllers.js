// const { Op } = require('sequelize')
const { UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize')
const { Manga, User, Review, sequelize } = require('../db/sequelizeSetup')

const findAllMangas = (req, res) => {
    // paramètre optionnel qui permet d'ajouter les données relatives aux commentaires d'un manga
    Manga.findAll({ include: [Review, User] })
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findAllMangasRawSQL = (req, res) => {
    sequelize.query("SELECT name, rating FROM mangas LEFT JOIN reviews ON mangas.id = reviews.MangaId", { type: QueryTypes.SELECT })
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findMangaByPk = (req, res) => {
    Manga.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'Un manga a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun manga n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createManga = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })

            }
            const newManga = { ...req.body, UserId: user.id, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
            Manga.create(newManga)
                .then((manga) => {
                    res.status(201).json({ message: 'Le manga a bien été créé', data: manga })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `Le manga n'a pas pu être créé`, data: error.message })
                })
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const createMangaWithImg = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            console.log(user)
            if (!user) {
                return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
            }//---------------------------------------------------------------http----------//----localhost3000---/images/--nom de l'imageavec extension
            const newManga = { ...req.body, UserId: user.id, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }

            Manga.create(newManga)
                .then((manga) => {
                    res.status(201).json({ message: 'Le manga a bien été créé', data: manga })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `Le manga n'a pas pu être créé`, data: error.message })
                })
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const updateManga = (req, res) => {
    Manga.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update({ ...req.body, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` })
                    .then(() => {
                        res.status(201).json({ message: 'Le manga a bien été mis à jour.', data: result })
                    })
            } else {
                res.status(404).json({ message: `Aucun manga à mettre à jour n'a été trouvé.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const updateMangaWithImg = (req, res) => {
    Manga.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update({ ...req.body, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` })
                    .then(() => {
                        res.status(201).json({ message: 'Le manga a bien été mis à jour.', data: result })
                    })
            } else {
                res.status(404).json({ message: `Aucun manga à mettre à jour n'a été trouvé.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const deleteManga = (req, res) => {
    // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
    Manga.findByPk(req.params.id)
        .then((result) => {
            // B. Si un manga correspond à l'id alors on exécute la méthode destroy()
            if (result) {
                return result.destroy()
                    // C. Si le manga est bien supprimé, on affiche un message avec comme data le manga récupéré dans le .findByPk()
                    .then((result) => {
                        res.json({ mesage: `Le manga a bien été supprimé.`, data: result })
                    })
            } else {
                // B Si aucun manga ne correspond à l'id alors on retourne une réponse à POSTMAN
                res.status(404).json({ mesage: `Aucun manga trouvé.` })
            }
        })
        .catch((error) => {
            // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
            res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
        })
}

module.exports = { findAllMangas, findMangaByPk, createManga, updateManga, deleteManga, findAllMangasRawSQL, createMangaWithImg, updateMangaWithImg  }