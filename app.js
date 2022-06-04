const express = require("express");
const app = express();
let bodyParser = require("body-parser");

const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

// DataBase Connection
require("./db/conn");
require("./db/localconn");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// const User = require('./model/userSchema');
app.use(express.json());

// Import Router
const authroute = require("./router/auth.js");
const productroute = require("./router/product.js");
const userroute = require("./router/userRoute.js");

// app.use(require("./router/auth"));
// app.use(require("./router/product"));
app.use("/product", productroute);
app.use("/shop", authroute);
app.use("/user", userroute);

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(port, (req, res) => {
  console.log(`listen ${port}`);
});
