const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.post('/signup', userController.addNewUser);
router.post('/signin', userController.signIn);

module.exports = router;