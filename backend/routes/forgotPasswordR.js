const express = require('express');
const ForgotPasswordController = require('../controllers/forgotPasswordC');
const fetchUser = require('../middleware/fetchUser')
const router =express.Router();


router.post('/forgot-password',ForgotPasswordController.forgotPassword)
router.get('/reset-password/:id',ForgotPasswordController.resetPassword)
router.get('/update-password/:id',ForgotPasswordController.updatePassword)


module.exports = router