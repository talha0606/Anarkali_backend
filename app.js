const express = require("express");
const app = express();
let bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

// DataBase Connection
require("./db/conn");
require("./db/localconn");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// const User = require('./model/userSchema');
app.use(express.json());
app.use(fileUpload());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Import Router
const authroute = require("./router/auth.js");
const productroute = require("./router/product.js");
const userroute = require("./router/userRoute.js");

// app.use(require("./router/auth"));
// app.use(require("./router/product"));
app.use("/product", productroute);
app.use("/shop", authroute);
app.use("/customer", userroute);

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(port, (req, res) => {
  console.log(`listen ${port}`);
});
