const Users = require("../models/usersM");

exports.signup = (req, res, next) => {
  userName = req.body.name;
  email = req.body.email;
  password = req.body.password;

  Users.create({ name: userName, email, password })
    .then((result) => {
      res.send("Successfully created");
    })
    .catch((err) => {
     res.send("SignUp failed: " + err.message)
    });
};
