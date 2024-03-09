const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const { v4: uuidv4 } = require('uuid');
uuidv4();

const ForgotPassword = sequelize.define("ForgotPassword", {
  id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  isActive: Sequelize.BOOLEAN,
});

module.exports = ForgotPassword;