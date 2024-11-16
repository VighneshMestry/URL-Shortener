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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
  }, {
    timestamps: true
  }
);

const URL = mongoose.model('url', urlSchema);

module.exports = URL;
