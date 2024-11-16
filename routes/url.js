const express = require("express");
const router = express.Router();

const {
  handleCreateShortUrl,
  handleGetAnalytics,
  getUrlFromShortId
} = require("../controllers/url");

router.post("/", handleCreateShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/:shortId", getUrlFromShortId);

module.exports = router;
