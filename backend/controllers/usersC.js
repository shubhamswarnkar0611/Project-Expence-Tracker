const Users = require("../models/usersM");
const ForgotPassword = require("../models/forgotPasswordM");
const bcrypt = require("bcrypt");
const JWT_SECRETE = "$ecreteHai"; // use it in .env file
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(404).json("Please fill all required fields");
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const userDetails = await Users.create({
      name,
      email,
      password: hashPassword,
    });

    const authToken = jwt.sign({ userId: userDetails.id }, JWT_SECRETE);
    res.status(200).json(authToken);
  } catch (e) {
    let msg;
    console.log("shubham : ", e.name);
    if (e.name == "SequelizeUniqueConstraintError") {
      msg = "User already exists";
    } else {
      msg = e.message;
    }
    res.status(400).json(msg);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(401).json("Please fill all required fields");
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(404).json("Invalid Username or Password");

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res.status(401).json("Invalid Username or Password");


    const authToken = jwt.sign({ userId: user.id }, JWT_SECRETE);
    res.status(200).json(authToken);
  } catch (err) {
    res.status(401).json(err.message);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    userId = req.user;
    const userDetail = await Users.findByPk(userId);
    res.send(userDetail);
  } catch (err) {
    console.log(err.message);
  }
};


