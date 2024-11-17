const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
    const token = req.cookies?.token;
    if(!token) return next();

    const user = getUser(token);
    console.log(user.role);
    req.user = user;
    next();
}

function restrictTo(roles) {
    return (req, res, next) => {
        if(!req.user) return res.redirect("login");

        if(!roles.includes(req.user.role)) { console.log("REached"); return res.end("Unauthorized");
}
        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}