const express = require('express');
const ExpenseController = require('../controllers/expenseC')
const fetchUser = require('../middleware/fetchUser')
const router =express.Router();

router.post('/add-expense',fetchUser,ExpenseController.addExpense);
router.post('/get-expense',fetchUser,ExpenseController.getExpense);
router.post('/download-expense',fetchUser,ExpenseController.downloadExpense);
router.post('/delete-expense',fetchUser,ExpenseController.deleteExpense);

module.exports = router