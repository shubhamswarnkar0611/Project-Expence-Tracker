const Users = require("../models/usersM");
const ForgotPassword = require("../models/forgotPasswordM");
const bcrypt = require("bcrypt");
const JWT_SECRETE = "$ecreteHai"; // use it in .env file
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await Users.findOne({ where: { email } });
    console.log(user);
    if (!user) return res.status(404).json("User not found.");

    const requestDetails = await user.createForgotPassword({
      isActive: true,
    });

    console.log("shubhamajkjkjkj", requestDetails.id);

    const ResetURL = `http://localhost:4000/reset-password/${requestDetails.id}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_KEY,
        pass: process.env.SMTP_SECRET,
      },
    });
    const info = await transporter.sendMail({
      from: '"Spent Wise 👻" <Spentwise@gmail.com>', // sender address
      to: email,
      subject: "Forgot Password", // Subject line
      text: "To Reset your Password Click On the Link", // plain text body
      html: `<h1>Spent Wise</h1>
      <h3>Click On The Link To Reset Your Password</h3>
      <div>${ResetURL}</div>`, // html body
    });

    res.status(201).json(info);
  } catch (err) {
    console.log(err);
    res.status(502).send(err.message);
  }
};

exports.resetPassword = async (req, res) => {
  const requestDetails = await ForgotPassword.findOne({
    where: { id: req.params.id },
  });

  if (requestDetails.isActive === true) {
    requestDetails.update({ isActive: false });
    res.status(200).send(`<html>
    <script>
        function formsubmitted(e){
            e.preventDefault();
            console.log('called')
        }
    </script>

    <form action="/update-password/${req.params.id}" method="get">
        <label for="newpassword">Enter New Password</label>
        <input name="newpassword" type="password" required></input>
        <button>reset password</button>
    </form>
</html>`);
    res.end();
  } else {
    res
      .status(401)
      .send("<h2>Session expired. Please reset the password again.</h2> ");
    res.end();
  }
};

exports.updatePassword = async (req, res) => {
  const newPassword = req.query.newpassword;
  console.log(req.params.id);
  try {
    const requestDetails = await ForgotPassword.findOne({
      where: { id: req.params.id },
    });
    if (!requestDetails) throw "No matching user found";
    console.log("ahjahnaiuueuwy",JSON.stringify(requestDetails));

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(newPassword, salt);

    let userData = await Users.findOne({where:{id:requestDetails.UserId}});
    if (!userData) throw "User not found";

    await userData.update({ password: hashedPwd });

    res.status(201).send("Password updated successfully");
  } catch (err) {
    console.log(err);
  res.status(502).send(err.message);
  }
  
};
