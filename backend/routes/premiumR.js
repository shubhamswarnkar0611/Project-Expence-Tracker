const express = require('express');
const premiumController = require('../controllers/premiumC')
const fetchUser = require('../middleware/fetchUser')
const router =express.Router();

router.get('/show-leaderboard',premiumController.showLeaderboard);


module.exports = router;