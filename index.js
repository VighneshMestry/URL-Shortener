const express = require("express");
const app = express();
const PORT = 8000;

const { mongoDbConnection } = require("./connection");
const userRouter = require("./routes/url");
const URL = require("./models/url");

app.use(express.json());

mongoDbConnection()
  .then(() => console.log("MongoDb connected"))
  .catch((err) => `Error connecting mongo ${err}`);

app.use("/url", userRouter);
app.use("/url/analytics/:shordId", userRouter);

// app.use('/url/:shortId', userRouter);
app.get("/:shortId", async (req, res) => {
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

  res.redirect(url.redirectedUrl);
});

app.listen(PORT, () => console.log("Server connected"));
