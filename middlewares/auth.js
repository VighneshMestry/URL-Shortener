const { getUser } = require("../services/auth");

function checkUserLogin(req, res, next) {
    const sessionId = req.cookies?.uid;
    if(!sessionId) return res.redirect("/login");

    const user = getUser(sessionId);
    console.log("User", user);
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

function checkAuth(req, res, next) {
    const sessionId = req.cookies?.uid;
    const user = getUser(sessionId);
    req.user = user;
    next();
}
module.exports = {
    checkUserLogin,
    checkAuth
}