const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');
const EstablishmentController = require('./controllers/EstablishmentController');

router.post('/users/signup', UserController.signUp);
router.post('/users/signin', UserController.signIn);

router.get('/establishments', EstablishmentController.index);
router.get('/establishments/:id', EstablishmentController.show);
router.put('/establishments/:id', EstablishmentController.update);
router.delete('/establishments/:id', EstablishmentController.destroy);

router.get('/users/:user_id/establishments', EstablishmentController.list);
router.post('/users/:user_id/establishments', EstablishmentController.store);

module.exports = router;
