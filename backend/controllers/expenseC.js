const Expense = require("../models/expenseM");
const User = require("../models/usersM");
exports.addExpense = async (req, res) => {
  try {
    const UserId = req.user;
    const { spent, description, category } = req.body;
    // 
    // console.log(req.user.totalSpent)
    if (!spent || !description || !category)
      return res.status(404).json("Fill are required");
    const expenceDetails = await Expense.create({
      spent,
      description,
      category,
      UserId,
    });
    const userDetails =await User.findByPk(UserId)
    console.log(JSON.stringify(userDetails))
    const totalSpent = Number(userDetails.totalSpent) + Number(spent);
    console.log("hjhjhjh",totalSpent)
    await User.update({ totalSpent }, { where: { id: UserId } });
    res.status(200).json(expenceDetails);
  } catch (err) {
    res.status(501).json(err.message);
  }
};

exports.getExpense = async (req, res) => {
  const UserId = req.user;
  try {
    console.log(UserId);
    const expenceDetails = await Expense.findAll({ where: { UserId: UserId } });

    if (expenceDetails.length === 0)
      return res.status(404).json("No Expense Found");
    console.log(expenceDetails);
    res.status(200).json(expenceDetails);
  } catch (err) {
    res.status(5001).json(err.message);
  }
};
exports.deleteExpense = async (req, res) => {
  const UserId = req.user;
  const { expenseId } = req.body;
  console.log(UserId, expenseId);
  try {
    const expense = await Expense.findByPk(expenseId);
    if (!expense) return res.status(404).send("Not found.");
    if (expense.UserId != UserId) {
      return res
        .status(403)
        .send("You do not have permission to delete this task.");
    }
    await Expense.destroy({ where: { id: expenseId } });
    res.status(201).json("Deleted Successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
};
