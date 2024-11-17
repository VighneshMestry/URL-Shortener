const express = require("express");
const { mongoDbConnection } = require("./connection");
const cookieParser = require("cookie-parser");
const URL = require("./models/url")

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRoutes");
const userRouter = require("./routes/userRoutes");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/admin/urls", restrictTo(["Admin"]), async (req, res, next) => {
  const urls = await URL.find({});
  res.render("home", {
    urls: urls
  });
});

app.use("/url", restrictTo(["Normal, Admin"]), urlRouter);
app.use("/", staticRouter);
app.use("/user", userRouter);

mongoDbConnection()
  .then(() => console.log("MongoDb connected"))
  .catch((err) => `Error connecting mongo ${err}`);

app.listen(PORT, () => console.log("Server connected"));
