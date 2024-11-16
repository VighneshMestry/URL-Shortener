const express = require("express");
const path = require('path')

const app = express();
const PORT = 8000;

const { mongoDbConnection } = require("./connection");
const userRouter = require("./routes/url");
const staticRouter = require("./routes/staticRoutes")
const URL = require("./models/url");

app.set('view engine', 'ejs');
app.set("views", __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

mongoDbConnection()
  .then(() => console.log("MongoDb connected"))
  .catch((err) => `Error connecting mongo ${err}`);

app.use("/url", userRouter);
app.use("/url/analytics/:shordId", userRouter);
app.use("/", staticRouter);


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
  if(url != null) return res.redirect(url.redirectedUrl);
  return res.json({Error: "Null response found"});
  // 
});

app.listen(PORT, () => console.log("Server connected"));
