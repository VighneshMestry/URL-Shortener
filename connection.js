const mongoose = require('mongoose')

async function mongoDbConnection() {
    return mongoose.connect("mongodb://127.0.0.1:27017/url_shortner");
}

module.exports = {
    mongoDbConnection
}