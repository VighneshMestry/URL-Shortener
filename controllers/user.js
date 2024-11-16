const User = require("../models/user");

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

module.exports = {
  handleUserSignup,
};
