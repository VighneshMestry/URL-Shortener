const jwt = require("jsonwebtoken");
const secretKey = "vighnesh";

function setUser(user) {
    return jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }, secretKey);
}

function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, secretKey);
    } catch(e) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}