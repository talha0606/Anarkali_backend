//------------------------------
//--------------------------------Auth.js Old Code-----------------
//---------------------------------

const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
// const multer = require("multer");
const authenticate = require("../middleware/authenticate");

const User = require("../model/userSchema");
const File = require("../model/fileSchema");
const Product = require("../model/productSchema");
const Location = require("../model/locationSchema");

require("../db/conn");

router.post("/storelocation", (req, res) => {
  const { shopId, longitude, latitude } = req.body;
  const location = new Location({ shopId, longitude, latitude });

  location
    .save()
    .then((resu) => {
      res.status(200).json({ id: "location registered Successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getlocation", async (req, res) => {
  console.log("Get Location");
  try {
    const locationed = await Location.find({ shopId: req.query.shopId });
    if (locationed) {
      res.status(200).send(locationed);
    }
  } catch (err) {
    console.log("Location Error: " + err);
  }
});

router.get("/homehome", (req, res) => {
  res.send(`Hello world from the server rotuer js shabash`);
});

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     // callback(null, "./uploads/");
//     callback(null, "../../Anarkali_frontend/public/uploads/");
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
// upload.single("shopImage");

router.post("/registered", async (req, res) => {
  const updated = await User.updateOne(
    { _id: req.body.id },
    { $set: { imageUrl: req.body.shopImage } }
  );
  // const userExist = await User.findOne({ email: req.body.id });
  // console.log("userExist: " + userExist);
  // // const userExist = null;
  // if (userExist) {
  //   console.log("Email already Exist");
  //   return res.status(422).json({ error: "Email already Exist" });
  // } else {
  //   res.status(200).json({ done: "not Exist" });
  // }
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
    const userExist = await User.findOne({ email: email });
    // console.log("userExist: " + userExist.sName);

    // const userExist = null;

    if (userExist) {
      console.log("Email already Exist");
      return res.status(422).json({ error: "Email already Exist" });
    } else {
      const user = new User({
        sName: req.body.sName,
        sDescription: req.body.sDescription,
        address: req.body.address,
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

    const userLogin = await User.findOne({ email: email });

    console.log("UserLogin: " + userLogin);

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
      // const isMatch = await bcrypt.compare(password, userLogin.password);

      // if (!isMatch) {
      //   res.status(400).json({ error: "Invalid Credientials " });
      // } else {
      //   // need to genereate the token and stored cookie after the password match
      //   token = await userLogin.generateAuthToken();
      //   console.log(token);

      //   res.cookie("jwtoken", token, {
      //     expires: new Date(Date.now() + 25892000000),
      //     httpOnly: true,
      //   });

      //   res.json({ message: "user Signin Successfully" });
      // }
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

// const { sName, address, email, password } = req.body;
// const { shopImage } = req.file.originalname;

// if (!sName || !address || !email || !password || !) {
//   return res.status(422).send("Please filled the empty field properly");
// }

// With Async and Await
// try {
//   // const userExist = await User.findOne({ email: email });

//   // if (userExist) {
//   //   return res.status.toString(422).json({ error: "Email already Exist" });
//   // } else if (password != cpassword) {
//   //   return res.status
//   //     .toString(422)
//   //     .json({ error: "Password are not matching" });
//   // } else {
//   //   // const user = new User(req.body).save();
//   const user = new User({
//     sName: req.body.sName,
//     address: req.body.address,
//     email: req.body.email,
//     password: req.body.password,
//     shopImage: req.file.originalname,
//   });

//   // yaha pr password and cpassword ko hash karain gy

//   const userRegistered = await user.save();

//   res.status(201).json({ message: "User Registered Successfully" });

//   // if (userRegistered) {
//   //   res.status(201).json({ message: "User Registered Successfully" });
//   // } else {
//   //   res.status(500).json({ error: "Failed to registered" });
//   // }
// } catch (error) {
//   console.log(error);
// }

// // With Promise
// // User.findOne({ email: email })
// //   .then((userExist) => {
// //     if (userExist) {
// //       return res.status.toString(422).json({ error: "Email already Exist" });
// //     }

// //     // const user = new User(req.body).save();
// //     const user = new User({
// //       name: name,
// //       email: email,
// //       phone,
// //       work,
// //       password,
// //       cpassword,
// //     });

// //     user
// //       .save()
// //       .then(() => {
// //         res.status(201).json({ message: "user registered successfully" });
// //       })
// //       .catch((err) =>
// //         res.status(500).json({ error: "Failed to registered" })
// //       );
// //   })
// //   .catch((error) => {
// //     console.log(error);
// //   });

// // console.log(req.body);
// // res.json({ message: req.body });
// // res.send("mera register page");

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Plz filled the data" });
//     }

//     const userLogin = await User.findOne({ email: email });
//     // console.log(userLogin);

//     if (userLogin) {
//       const isMatch = await bcrypt.compare(password, userLogin.password);

//       // Generate Web Tokens for security
//       const token = await userLogin.generateAuthToken();
//       console.log(token);

//       // Generate cookies
//       res.cookie("jwtoken", token, {
//         expires: new Date(Date.now() + 25892000000),
//         httpOnly: true,
//       });
//       // if (!userlogin)
//       if (!isMatch)
//         res.status(400).json({ error: "Invalid login Credentials pass" });
//       else res.json({ message: "User Signin Successfully" });
//     } else {
//       res.status(400).json({ error: "Invalid login Credentials" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// For Products....................................
// router.post("/products", async (req, res) => {
//   console.log(`In Home API`);
//   console.log("Price: ", req.body.price);
//   let findArgs = {};

//   for (let key in req.body.filters) {
//     if (req.body.filters[key].length > 0) {
//       if (key === "brand") {
//         findArgs[key] = req.body.filters[key];
//         console.log(req.body.filters[key]);
//         console.log(findArgs);
//       } else {
//         findArgs[key] = req.body.filters[key];
//         console.log(req.body.filters[key]);
//         console.log(findArgs);
//       }
//     }
//   }
//   const rootUser = await Product.find(findArgs);

// if (req.body.price && !findArgs) {
//   const rootUser = await Product.find({ price: { $lte: req.body.price } });
//   if (!rootUser) {
//     throw new Error("Data not Found");
//   }
//   res.send(rootUser);
// } else if (!req.body.price && findArgs) {
//   const rootUser = await Product.find(findArgs);
//   if (!rootUser) {
//     throw new Error("Data not Found");
//   }
//   res.send(rootUser);
// } else {
//   const rootUser = await Product.find(findArgs);
// const finalhops = await rootUser.find({ price: { $lte: req.body.price } });
// if (!finalhops) {
//   throw new Error("Data not Found");
// }

//   res.send(rootUser);
// }

//   if (!rootUser) {
//     throw new Error("Data not Found");
//   }

//   res.send(rootUser);
// });

// For Shops..................................
router.post("/home", async (req, res) => {
  console.log(`In Home API`);
  // console.log("Price: ", req.body.price);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "brand") {
        findArgs[key] = req.body.filters[key];
        console.log(req.body.filters[key]);
        console.log(findArgs);
      } else {
        findArgs[key] = req.body.filters[key];
        console.log(req.body.filters[key]);
        console.log(findArgs);
      }
    }
  }
  const rootUser = await User.find(findArgs);
  // console.log(rootUser);
  if (!rootUser) {
    throw new Error("Data not Found");
  }

  res.send(rootUser);
});

router.get("/shopinfo", async (req, res) => {
  console.log("ShopInfo API");
  const ShopData = await User.find({ _id: req.query.sellerid });
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
      const Shops = await User.find({
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
