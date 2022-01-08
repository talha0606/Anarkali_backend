const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

require("./db/conn");
app.use(cookieParser());
// const User = require('./model/userSchema');

app.use(express.json());

// we link the router files to make our route easy
app.use(require("./router/auth"));

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(port, (req, res) => {
  console.log(`listen ${port}`);
});
