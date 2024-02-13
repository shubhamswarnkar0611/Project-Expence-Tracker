const Sequelize= require("sequelize");

const sequelize = new Sequelize('expense_tracker_react','root','Shubham@123',{dialect:'mysql',host: 'localhost'});

module.exports = sequelize;