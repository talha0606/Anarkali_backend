// const jwt = require("jsonwebtoken");
// const File = require("../model/fileSchema");
// const multer = require("multer");
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Shop = require("../model/shopSchema");
const Location = require("../model/locationSchema");

require("../db/conn");

router.get("/homehome", (req, res) => {
  res.send(`Hello world from the server rotuer js shabash`);
});

router.post("/registered", async (req, res) => {
  const updated = await Shop.updateOne(
    { _id: req.body.id },
    { $set: { imageUrl: req.body.shopImage } }
  );
});

router.post(
  "/register",
  /*upload.single("shopImage"),*/ async (req, res) => {
    // for signin
    const { sName, sDescription, address, email, password, url, category } =
      req.body;
    // const { shopImage } = req.file.originalname;

    if (
      !sName ||
      !sDescription ||
      !address ||
      !email ||
      !password ||
      !category
    ) {
      return res.status(402).send("Please filled the empty field properly");
    }

    console.log(`Register Shop Please ${req.body.email}`);
    const userExist = await Shop.findOne({ email: email });
    // console.log("userExist: " + userExist.sName);

    // const userExist = null;

    if (userExist) {
      console.log("Email already Exist");
      return res.status(422).json({ error: "Email already Exist" });
    } else {
      const user = new Shop({
        sName: req.body.sName,
        sDescription: req.body.sDescription,
        address: req.body.address,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        password: req.body.password,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        // shopImage: req.file.originalname,
      });

      user
        .save()
        .then((resu) => {
          console.log(resu._id);
          res.status(200).json({ id: resu._id });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

router.post("/ajabhai", (req, res) => {
  console.log("aja bhai");
  console.log(req.body.imageUrl);
});

router.post("/signinin", async (req, res) => {
  console.log("signinsigninsignin");
  try {
    let token;
    const { email, password } = req.body;
    console.log("Email: " + email);
    console.log("Password: " + password);

    if (!email || !password) {
      return res.status(402).json({ error: "Plz Filled the data" });
    }

    const userLogin = await Shop.findOne({ email: email });

    // console.log("UserLogin: " + userLogin);

    if (userLogin) {
      if (userLogin.password != password)
        res.status(400).json({ error: "Invalid Credientials " });
      else {
        token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        console.log(`idd : ${userLogin._id}`);
        console.log(`idd : ${typeof userLogin._id}`);
        res.status(202).json({ id: userLogin._id });
      }
    } else {
      res.status(400).json({ error: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Logout  ka page
router.get("/logout", (req, res) => {
  console.log(`Hello my Logout Page`);
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User lOgout");
});

// For Shops..................................
router.post("/home", async (req, res) => {
  console.log(`In Home API`);
  console.log("Filters: ", req.body.filters);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "brand") {
        findArgs[key] = req.body.filters[key];
        console.log(req.body.filters[key]);
        // console.log(findArgs);
      } else {
        findArgs[key] = req.body.filters[key];
        console.log(req.body.filters[key]);
        // console.log(findArgs);
      }
    }
  }
  console.log("Auth.js: " + findArgs);

  const rootUser = await Shop.find(findArgs);
  // console.log(rootUser);
  if (!rootUser) {
    throw new Error("Data not Found");
  }

  res.send(rootUser);
});

router.get("/shopinfo", async (req, res) => {
  console.log("ShopInfo API");
  const ShopData = await Shop.find({ _id: req.query.sellerid });
  console.log(`Shop Data: ${ShopData}`);
  res.send(ShopData);
});

router.get("/shop_by_id", async (req, res) => {
  console.log("Shop-By-Id API");
  const ShopData = await Shop.find({ _id: req.query.shopId });
  console.log(`Shop Data: ${ShopData}`);
  res.send(ShopData);
});

router.get("/sellerinfo", authenticate, async (req, res) => {
  console.log("ShopInfo API");
  const ShopData = await User.find({ _id: req.query.sellerid });
  res.send(ShopData);
});

router.get("/searchShop", async (req, res) => {
  console.log("Search Shop API..." + req.query.name);
  const searchString = req.query.name;
  console.log("Search String length: " + searchString.length);

  // const cities = await City.find({
  //   city: { $regex: req.query.val, $options: "i" },
  // }).limit(5);

  // db.inventory.find({ $or: [{ quantity: { $lt: 20 } }, { price: 10 }] });
  if (searchString.replace(/\s/g, "").length) {
    try {
      const Shops = await Shop.find({
        $or: [
          { sName: { $regex: searchString, $options: "i" } },
          { sDescription: { $regex: searchString, $options: "i" } },
        ],
      }).limit(5);

      console.log(Shops);
      res.status(200).send(Shops);
    } catch (err) {
      console.log("Error: " + err);
    }
  } else {
    console.log("Else oye");
    res.send("");
  }
});

// router.post("/storelocation", (req, res) => {
//   const { shopId, longitude, latitude } = req.body;
//   const location = new Location({ shopId, longitude, latitude });

//   location
//     .save()
//     .then((resu) => {
//       res.status(200).json({ id: "location registered Successfully" });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.get("/getlocation", async (req, res) => {
//   console.log("Get Location");
//   try {
//     const locationed = await Location.find({ shopId: req.query.shopId });
//     if (locationed) {
//       res.status(200).send(locationed);
//     }
//   } catch (err) {
//     console.log("Location Error: " + err);
//   }
// });

//.........................................................................................
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "../Anarkali_backend/uploads/");
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/postImage", upload.single("shopImage"), (req, res) => {
//   console.log("New File API");
//   const newFile = new File({
//     shopImage: req.file.originalname,
//   });

//   newFile
//     .save()
//     .then((resu) => {
//       console.log("New File Posted" + resu.shopImage);
//       res.sendFile(
//         `C:/Users/Muhammad Talha/Anarkali_backend/uploads/${resu.shopImage}`
//       );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
