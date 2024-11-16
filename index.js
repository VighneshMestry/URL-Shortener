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
app.use("/", staticRouter);


app.listen(PORT, () => console.log("Server connected"));
