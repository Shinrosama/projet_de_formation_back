const express = require('express')
const router = express.Router()
const { findAllUsers, createUser, findUserByPk, deleteUser, updateUser } = require('../controllers/userControllers.js')
const { login, protect, restrict, correctUser } = require('../controllers/authControllers')
const { User } = require('../db/sequelizeSetup.js')

router
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/login')
    .post(login)

router
    .route('/:id')
    .get(findUserByPk)
    .put(protect, correctUser, updateUser)
    .delete(protect, correctUser, deleteUser)
    .delete(protect, restrict('superadmin'), deleteUser)
    

module.exports = router