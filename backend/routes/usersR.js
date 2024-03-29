const express = require('express');
const UsersController = require('../controllers/usersC');
const fetchUser = require('../middleware/fetchUser')
const router =express.Router();

router.post('/signup',UsersController.signup)
router.post('/login',UsersController.login)
router.post('/get-user',fetchUser,UsersController.getUser)



module.exports = router