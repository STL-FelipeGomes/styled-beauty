const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');
const EstablishmentController = require('./controllers/EstablishmentController');

router.post('/users/signup', UserController.signUp);

router.get('/establishments', EstablishmentController.index);
router.post('/users/:user_id/establishments', EstablishmentController.store);

module.exports = router;
