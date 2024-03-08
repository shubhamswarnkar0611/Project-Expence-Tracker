const express = require('express');
const ExpenseController = require('../controllers/expenseC')
const UsersController = require('../controllers/usersC');
const fetchUser = require('../middleware/fetchUser')
const router =express.Router();

router.post('/signup',UsersController.signup)
router.post('/login',UsersController.login)
router.post('/get-user',fetchUser,UsersController.getUser)
router.get('/forgot-password',UsersController.forgotPassword)


module.exports = router