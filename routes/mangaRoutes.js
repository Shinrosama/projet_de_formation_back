const express = require('express')
const router = express.Router()
const { findAllMangas, createManga, findAllMangasRawSQL, findMangaByPk, updateManga, deleteManga, updateMangaWithImg, createMangaWithImg } = require('../controllers/mangaControllers')
const { protect, restrictToOwnUser } = require('../controllers/authControllers')
const { Manga} = require('../db/sequelizeSetup')
const multer = require('../middleware/multer-config')

router
    .route('/')
    .get(findAllMangas)
    .post(protect, createManga)

router
    .route('/withImg')
    .post(protect, multer, createMangaWithImg)

router
    .route('/withImg/:id')
    .put(protect, restrictToOwnUser(Manga), multer, updateMangaWithImg)
    
router
    .route('/rawsql')
    .get(findAllMangasRawSQL)

router
    .route('/:id')
    .get(findMangaByPk)
    .put(protect, restrictToOwnUser(Manga), multer, updateManga)
    .delete(protect, restrictToOwnUser(Manga), deleteManga)

module.exports = router