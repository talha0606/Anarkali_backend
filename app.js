const express = require("express");
const app = express();

const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

// DataBase Connection
require("./db/conn");
require("./db/localconn");

app.use(cookieParser());
// const User = require('./model/userSchema');
app.use(express.json());

// Import Router
const authroute = require("./router/auth.js");
const productroute = require("./router/product.js");

// app.use(require("./router/auth"));
// app.use(require("./router/product"));
app.use("/product", productroute);
app.use("/shop", authroute);

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(port, (req, res) => {
  console.log(`listen ${port}`);
});
