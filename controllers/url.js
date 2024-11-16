// import { nanoid } from 'nanoid'
const URL = require("../models/url");

async function handleCreateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.json(400).json({ Error: "Send correct url" });
  }
  const { nanoid } = await import("nanoid");
  const shortUrl = nanoid(8);
  const newUrl = await URL.create({
    shortUrl: shortUrl,
    redirectedUrl: body.url,
    visitedHistory: [],
  });

  return res.render("home", {
    newUrl: newUrl,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortUrl: shortId });
  return res.json({
    NumberofClicks: result.visitedHistory.length,
    Analytics: result.visitedHistory,
  });
}

async function getUrlFromShortId(req, res) {
  const shortId = req.params.shortId;
  const url = await URL.findOneAndUpdate(
    {
      shortUrl: shortId,
    },
    {
      $push: {
        visitedHistory: {
          timestamp: 123,
        },
      },
    }
  );
  if (url != null) return res.redirect(url.redirectedUrl);
  return res.json({ Error: "Null response found" });
}

module.exports = {
  handleCreateShortUrl,
  handleGetAnalytics,
  getUrlFromShortId
};
