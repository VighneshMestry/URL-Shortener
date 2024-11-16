const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    redirectedUrl: {
      type: String,
      required: true,
    },
    visitedHistory: [
      {
        timeStamp: {
          type: Number,
        },
      },
    ],
  }, {
    timestamps: true
  }
);

const URL = mongoose.model('url', urlSchema);

module.exports = URL;
