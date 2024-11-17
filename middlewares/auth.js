const { getUser } = require("../services/auth");

function checkUserLogin(req, res, next) {
    const token = req.cookies?.uid;
    if(!token) return res.redirect("/login");

    const user = getUser(token);
    console.log("User", user);
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

function checkAuth(req, res, next) {
    const token = req.cookies?.uid;
    const user = getUser(token);
    req.user = user;
    next();
}
module.exports = {
    checkUserLogin,
    checkAuth
}