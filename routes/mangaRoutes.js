const express = require('express')
const router = express.Router()
const { findAllMangas, createManga, findAllMangasRawSQL, findMangaByPk, updateManga, deleteManga } = require('../controllers/mangaControllers')
const { protect, restrictToOwnUser } = require('../controllers/authControllers')
const { Manga} = require('../db/sequelizeSetup')
const multer = require('../middleware/multer-config');

router
    .route('/')
    .get(findAllMangas)
    .post(protect, multer, createManga)
    



router
    .route('/rawsql')
    .get(findAllMangasRawSQL)

router
    .route('/:id')
    .get(findMangaByPk)
    .put(protect, restrictToOwnUser(Manga), multer, updateManga)
    .delete(protect, restrictToOwnUser(Manga), deleteManga)

module.exports = router