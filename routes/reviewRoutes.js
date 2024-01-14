// Importe le module Express pour créer un routeur dédié aux reviews (reviews)
const express = require('express');
const router = express.Router();

// Importe les fonctions de contrôleur pour le CRUD des reviews
const { findAllReviews, findReviewByPk, createReview, updateReview, deleteReview } = require('../controllers/reviewControllers');

// Importe les fonctions de contrôleur liées à la protection de l'accès et à la restriction aux utilisateurs concernés 
const { protect, restrictToOwnUser } = require('../controllers/authControllers');

// Importe le modèle Sequelize 'Review' à partir de SequelizeSetup
const { Review } = require('../db/sequelizeSetup');

// Définit les routes pour le CRUD sur les reviews
router
    .route('/')
    // Gère les requêtes sur la racine du chemin '/api/reviews'
    .get(findAllReviews) // Appelle la fonction pour récupérer toutes les reviews lors d'un get
    .post(protect, createReview); // Appelle la fonction pour créer une review avec protection d'accès lors d'un post

router
    // Gère les requêtes avec un identifiant en paramètre dans l'url
    .route('/:id')
    // Appelle la fonction pour récupérer une review par son id lors d'un get
    .get(findReviewByPk) 
     // Appelle la fonction pour mettre à jour une review avec protection et restriction lors d'un put
    .put(protect, restrictToOwnUser(Review), updateReview)
    // Appelle la fonction pour supprimer une review avec protection et restriction lors d'un delete
    .delete(protect, restrictToOwnUser(Review), deleteReview); 

// Exporte le routeur pour une utilisation dans d'autres parties de l'application
module.exports = router;
