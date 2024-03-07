const Expense = require("../models/expenseM");
const User = require("../models/usersM");

exports.showLeaderboard = async (req, res) => {
  let allUser = [];
  let leaderboard = [];
  try {
    const expenceDetails = await Expense.findAll();
    expenceDetails.forEach((expense) => {
      console.log(JSON.stringify(expense.UserId));
      let UserId = expense.UserId;
      let spent = +expense.spent;

      const existingUserIndex = allUser.findIndex(
        (user) => user.UserId === UserId
      );
      const existingUser = allUser[existingUserIndex];

      if (existingUser) {
        allUser[existingUserIndex] = {
          UserId,
          spent: existingUser.spent + spent,
        };
      } else {
        allUser.push({
          UserId,
          spent: spent,
        });
      }
    });
    // Sorting the array in descending order of amount spent by each user
    allUser = allUser.sort((a, b) => b.spent - a.spent);

    const userDetailPromises = allUser.map(async (user) => {
        const id = user.UserId;
        const userDetails = await User.findByPk(id);
        return {
            ...user,
            name: userDetails.name,
        };
    });

    const populatedAllUser = await Promise.all(userDetailPromises);

    res.json(populatedAllUser);

  } catch (err) {
    res.status(5001).json(err.message);
  }
};
