const Expense = require("../models/expenseM");
const User = require("../models/usersM");
const sequelize = require("../utils/database");

// exports.showLeaderboard = async (req, res) => {
//   let allUser = [];
//   let leaderboard = [];
//   try {
//     const expenceDetails = await Expense.findAll();
//     expenceDetails.forEach((expense) => {
//       console.log(JSON.stringify(expense.UserId));
//       let UserId = expense.UserId;
//       let spent = +expense.spent;

//       const existingUserIndex = allUser.findIndex(
//         (user) => user.UserId === UserId
//       );
//       const existingUser = allUser[existingUserIndex];

//       if (existingUser) {
//         allUser[existingUserIndex] = {
//           UserId,
//           spent: existingUser.spent + spent,
//         };
//       } else {
//         allUser.push({
//           UserId,
//           spent: spent,
//         });
//       }
//     });
//     // Sorting the array in descending order of amount spent by each user
//     allUser = allUser.sort((a, b) => b.spent - a.spent);

//     const userDetailPromises = allUser.map(async (user) => {
//         const id = user.UserId;
//         const userDetails = await User.findByPk(id);
//         return {
//             ...user,
//             name: userDetails.name,
//         };
//     });

//     const populatedAllUser = await Promise.all(userDetailPromises);

//     res.json(populatedAllUser);

//   } catch (err) {
//     res.status(5001).json(err.message);
//   }
// };
exports.showLeaderboard = async (req, res) => {
   try{
    const leaderboardOfUser = await User.findAll();

    res.status(200).json(leaderboardOfUser)
  
    } catch (err) {
      res.status(501).json(err.message);
    }
  };
// exports.showLeaderboard = async (req, res) => {
//    try{
//     const leaderboardOfUser = await User.findAll({
//         attributes: [
//           'id',
//           'name',
//           [sequelize.fn('sum', sequelize.col('expenses.spent')), 'spent']
//         ],
//         include: [
//           {
//             model: Expense,
//             attributes: []
//           }
//         ],
//         group: ['users.id'],
//         order: [['spent', 'DESC']]
//       });

//     res.status(200).json(leaderboardOfUser)
  
//     } catch (err) {
//       res.status(501).json(err.message);
//     }
//   };
