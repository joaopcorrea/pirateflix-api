const express = require('express');
const router = express.Router();

const auth = require('./middlewares/auth');

const statusController = require('./controllers/statusController');
const loginController = require('./controllers/loginController');

const userController = require('./controllers/userController');

// router.get('/status', statusController.getStatus);

router.post('/login', loginController.login);

router.use(auth);

router.get('/users', userController.getAll);
router.get('/users/:code', userController.getSingle);
router.post('/users', userController.insert);
router.put('/users/:code', userController.update);
router.delete('/users/:code', userController.delete);

module.exports = router;