const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  console.log(`User created: ${user.name}`);
  return res.redirect("/home");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password
  });

  if(!user) {
    return res.redirect("/login");
  }

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/home");
}

module.exports = {
  handleUserSignup,
  handleUserLogin
};
