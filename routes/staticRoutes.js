const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get("/home", async (req, res) => {
  const urls = await URL.find({});
  return res.render("home", {
    urls: urls,
  });
});

router.get("/signup", async (req, res) => {
    return res.render("signup");
});

module.exports = router;
