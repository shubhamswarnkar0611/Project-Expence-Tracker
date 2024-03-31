const Expense = require("../models/expenseM");
const User = require("../models/usersM");
const sequelize = require("../utils/database");
const S3Services = require("../services/Aws_s3_service");
require("dotenv").config();

exports.addExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const UserId = req.user;
    const { spent, description, category } = req.body;
    if (!spent || !description || !category)
      return res.status(404).json("Fill are required");
    const expenseDetails = await Expense.create(
      {
        spent,
        description,
        category,
        UserId,
      },
      { transaction: t }
    );
    const userDetails = await User.findByPk(UserId);
    const totalSpent = Number(userDetails.totalSpent) + Number(spent);
    // Introduce a deliberate error to trigger rollback
    await User.update(
      { totalSpent },
      { where: { id: UserId }, transaction: t }
    );
    await t.commit();
    res.status(200).json(expenseDetails);
  } catch (err) {
    await t.rollback();
    res.status(501).json(err.message);
  }
};

exports.downloadExpense = async (req, res) => {
  const UserId = req.user;
  try {
    console.log(UserId);
    const expenseDetails = await Expense.findAll({ where: { UserId: UserId } });
    if (expenseDetails.length === 0)
      return res.status(404).json("No Expense Found");
    const fileName = `Expense-${UserId}-${new Date()}.txt`;
    const fileUrl = await S3Services.UploadToS3(fileName, expenseDetails);
    console.log(fileUrl);
    res.status(200).json(fileUrl);
  } catch (err) {
    res.status(501).json(err.message);
  }
};
exports.getExpense = async (req, res) => {
  const UserId = req.user;
  const page = req.body.currentPage || 1;
  const perPage = Number(req.body.perPage) || 8;
  console.log(perPage)
  const limit =perPage;
  let offset = (page - 1) * limit;

  try {
    const totalExpenses = await Expense.count({ where: { UserId: UserId } });
    console.log("totalExpenses", totalExpenses);
    const expenseDetails = await Expense.findAll({
      where: { UserId: UserId },
      offset,
      limit,
    });
    console.log(expenseDetails);
    if (expenseDetails.length === 0)
      return res.status(404).json("No Expense Found");

    res
      .status(200)
      .json({
        expenseDetails,
        nPages: Math.ceil(totalExpenses / limit),
        currentPage: page,
      });
  } catch (err) {
    res.status(501).json(err.message);
  }
};
exports.deleteExpense = async (req, res) => {
  const t = await sequelize.transaction();
  const UserId = req.user;
  const { expenseId } = req.body;
  console.log(UserId, expenseId);
  try {
    const expense = await Expense.findByPk(expenseId);
    console.log(expense.spent);
    if (!expense) return res.status(404).send("Not found.");
    if (expense.UserId != UserId) {
      return res
        .status(403)
        .send("You do not have permission to delete this task.");
    }
    const userDetails = await User.findByPk(UserId);
    const totalSpent = Number(userDetails.totalSpent) - Number(expense.spent);
    await User.update(
      { totalSpent },
      { where: { id: UserId }, transaction: t }
    );

    await Expense.destroy({ where: { id: expenseId }, transaction: t });
    await t.commit();
    res.status(201).json("Deleted Successfully");
  } catch (e) {
    await t.rollback();
    res.status(501).send(e.message);
  }
};
