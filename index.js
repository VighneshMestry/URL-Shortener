const express = require("express");
const { mongoDbConnection } = require("./connection");
const cookieParser = require("cookie-parser");

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRoutes");
const userRouter = require("./routes/userRoutes");
const { checkUserLogin, checkAuth } = require("./middlewares/auth");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", checkUserLogin, urlRouter);
app.use("/", checkAuth, staticRouter);
app.use("/user", userRouter);

mongoDbConnection()
  .then(() => console.log("MongoDb connected"))
  .catch((err) => `Error connecting mongo ${err}`);

app.listen(PORT, () => console.log("Server connected"));
