const Expense = require("../models/expenseM");
exports.addExpense = async (req, res) => {
    try {
  const { spent, description, category } = req.body;
  if (!spent || !description || !category) return res.status(404).json("Fill are required")
  const expenceDetails = await Expense.create({
    spent,
    description,
    category,
  });
  res.status(200).json(expenceDetails)
}catch(err){
    res.status(5001).json(err.message)
}
};
exports.deleteExpense = async (req, res) => {
    try {
  const { expenseId } = req.body;
  if (!spent || !description || !category) return res.status(404).json("Fill are required")
  const expenceDetails = await Expense.create({
    spent,
    description,
    category,
  });
  res.status(200).json(expenceDetails)
}catch(err){
    res.status(5001).json(err.message)
}
};
