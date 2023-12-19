const express = require('express')
const router = express.Router()
const { findAllRatings, findRatingByPk, createRating, updateRating, deleteRating } = require('../controllers/ratingControllers')
const { protect, restrictToOwnUser } = require('../controllers/authControllers')
const { Rating } = require('../db/sequelizeSetup')

router
    .route('/')
    .get(findAllRatings)
    .post(protect, createRating)

router
    .route('/:id')
    .get(findRatingByPk)
    .put(protect, restrictToOwnUser(Rating), updateRating)
    .delete(protect, restrictToOwnUser(Rating), deleteRating)

module.exports = router 