const express = require("express");
const router = express.Router();

const {
  handleCreateShortUrl,
  handleGetAnalytics
} = require("../controllers/url");

router.post("/", handleCreateShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
