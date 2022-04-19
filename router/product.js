const express = require("express");
const router = express.Router();

const {
  singleproduct,
  productadded,
  searchProduct,
  updateProduct,
  deleteproduct,
  prodinfo,
  prod_by_id,
  myproducts,
  allproducts,
} = require("../controllers/productController");

router.route("/product").post(singleproduct);
router.route("/productadded").post(productadded);
router.route("/searchProduct").get(searchProduct);
router.route("/updateProduct").post(updateProduct);
router.route("/deleteproduct").get(deleteproduct);
router.route("/prodinfo").get(prodinfo);
router.route("/prod_by_id").get(prod_by_id);
router.route("/myproducts").get(myproducts);
router.route("/allproducts").get(allproducts);

module.exports = router;

// Product Schema added
// const Product = require("../model/productSchema");

// // import Cloudinary and Multer files to store images in Cloudinary
// const cloudinary = require("../utils/cloudinary");
// const upload = require("../utils/multer");
// const ApiFeatures = require("../utils/apifeatures");

// router.post(
//   "/product",
//   /*upload.single("prodImage"),*/ async (req, res) => {
//     // for signin
//     console.log("Product addition api");
//     console.log("id: " + req.body.sellerId);
//     console.log("name: " + req.body.pName);
//     console.log("desc: " + req.body.pDescription);
//     console.log("name: " + req.body.prodImage);

//     const {
//       sellerId,
//       pName,
//       pDescription,
//       price,
//       prodImage,
//       category,
//       brand,
//       stock,
//     } = req.body;
//     if (!pName || !pDescription || !price || !category || !brand || !stock) {
//       return res.status(402).send("Please filled the empty field properly");
//     }

//     // const productExist = await Product.findOne({ _id: req.body.id });

//     if (false) {
//       //       // console.log("if......Product addition api");
//       //       // console.log("iddddd: " + req.body.id);
//       //       // console.log("name: " + req.body.pName);
//       //       // const updated = Product.updateOne(
//       //       //   { pName: req.body.pName },
//       //       //   {
//       //       //     $set: {
//       //       //       price: req.body.price,
//       //       //     },
//       //       //   }
//       //       // );
//       //       // console.log("Upadated value: " + updated);
//     } else {
//       const prod = new Product({
//         sellerId: req.body.sellerId,
//         pName: req.body.pName,
//         pDescription: req.body.pDescription,
//         price: req.body.price,
//         prodImage: req.body.prodImage,
//         category: req.body.category,
//         brand: req.body.brand,
//         stock: req.body.stock,
//       });

//       prod
//         .save()
//         .then((resu) => {
//           console.log("New Product Added");
//           res.status(200).json({ id: resu._id });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }
// );

// router.post("/productadded", async (req, res) => {
//   console.log("Product Added Again");
//   const updated = await Product.updateOne(
//     { _id: req.body.id },
//     { $set: { prodImage: req.body.prodImage } }
//   );
//   if (updated) {
//     console.log("Updated Product Added Again");
//     res.status(200).json({ added: "Image Added Successfully" });
//   }
// });

// router.get("/searchProduct", async (req, res) => {
//   const searchString = req.query.name;

//   // const cities = await City.find({
//   //   city: { $regex: req.query.val, $options: "i" },
//   // }).limit(5);

//   // db.inventory.find({ $or: [{ quantity: { $lt: 20 } }, { price: 10 }] });
//   try {
//     const Products = await Product.find({
//       $or: [
//         { pName: { $regex: req.query.name, $options: "i" } },
//         { pDescription: { $regex: req.query.name, $options: "i" } },
//         { brand: { $regex: req.query.name, $options: "i" } },
//       ],
//     }).limit(5);

//     console.log(Products);
//     res.status(200).send(Products);
//   } catch (err) {
//     console.log("Error: " + err);
//   }
// });

// router.post("/updateProduct", upload.single("image"), async (req, res) => {
//   console.log("updateProduct ApI: " + req.body.id);
//   console.log("Path: " + req.file);
//   const {
//     sellerId,
//     id,
//     pName,
//     pDescription,
//     price,
//     prodImage,
//     category,
//     brand,
//     stock,
//   } = req.body;
//   // console.log("ABC: " + abc);

//   if (req.file === undefined) {
//     const updated = await Product.updateOne(
//       { _id: id },
//       {
//         $set: {
//           sellerId,
//           pName,
//           pDescription,
//           price,
//           prodImage,
//           category,
//           brand,
//           stock,
//         },
//       }
//     );
//     console.log("In If clause: After upadated api");
//     if (updated) res.status(200).json({ done: "upadated ho gai yrr" });
//   } else {
//     // console.log("AnbhbBC: " + abc);
//     const result = await cloudinary.uploader.upload(req.file.path);
//     const updated = await Product.updateOne(
//       { _id: req.body.id },
//       {
//         $set: {
//           sellerId,
//           pName,
//           pDescription,
//           price,
//           prodImage: result.secure_url,
//           category,
//           brand,
//           stock,
//         },
//       }
//     );
//     console.log("In Else Clause: After upadated api");
//     if (updated) res.status(200).json({ done: "upadated ho gai yrr" });
//   }
// });

// router.get("/deleteproduct", async (req, res) => {
//   try {
//     console.log("Delete Product API..." + req.query.id);
//     const deleted = await Product.deleteOne({ _id: req.query.id });
//     console.log("Delete Product API..." + deleted);

//     if (deleted) {
//       res.status(200).send("Product Deleted Successfully");
//     }
//   } catch (err) {
//     console.log("DeleteProductError: " + err.Message);
//   }
// });

// router.get("/prodinfo", async (req, res) => {
//   console.log("ProductInfo API");
//   const prodData = await Product.find({ _id: req.query.id });
//   res.send(prodData);
// });

// router.get("/prod_by_id", async (req, res) => {
//   console.log("In Shop Detail API");

//   let type = req.query.type;
//   let prodId = req.query.id;

//   console.log(req.query.type);
//   console.log(prodId);

//   // if (type === "array") {
//   // }

//   const prod = await Product.findOne({ _id: prodId });
//   if (!prod) {
//     throw new Error("Shop not found");
//   } else {
//     console.log("Product found");
//   }
//   console.log(prod);

//   res.send(prod);
// });

// router.get("/myproducts", async (req, res) => {
//   try {
//     console.log("Seller Id: " + req.query.id);
//     console.log("Myproducts API");
//     // const myproducts = await Product.find({ sellerId: req.query.id });
//     const myproducts = await Product.find(
//       { sellerId: req.query.id },
//       function (err, myproducts) {
//         if (err) {
//           console.log(err);
//           res.status(500).send(err);
//         } else {
//           // console.log("Myproducts: " + myproducts);
//           res.status(200).send(myproducts);
//         }
//       }
//     );
//     // console.log("Myproducts:" + myproducts);
//     // res.send(myproducts);
//   } catch (err) {
//     console.log(err.Message);
//   }
// });

// router.get("/allproducts", async (req, res) => {
//   try {
//     const resultPerPage = 12;
//     const productsCount = await Product.countDocuments();

//     const apiFeature = new ApiFeatures(Product.find(), req.query)
//       .search()
//       .filter();

//     let myproducts = await apiFeature.query;

//     let filteredProductsCount = myproducts.length;

//     apiFeature.pagination(resultPerPage);

//     myproducts = await apiFeature.query;

//     // const myproducts = await Product.find({});
//     console.log("Myproducts:" + myproducts);
//     res.status(200).json({
//       success: true,
//       myproducts,
//       productsCount,
//       resultPerPage,
//       filteredProductsCount,
//     });
//   } catch (err) {
//     console.log("error oye");
//     console.log(err);
//   }
// });

// // ---------------------------On the way---------------------
// // router.get("/myProducts", async (req, res) => {
// //   try {
// //     console.log("Seller Id: " + req.query.id);
// //     console.log("MyProducts API");

// //     const myproducts = await Product.find({
// //       sellerid: req.query.id},
// //       function (err, myproducts){
// //         if(err){
// //           console.log(err);
// //           res.status(500).send(err);

// //         }
// //         else
// //         {
// //           cout << "show something";
// //         }
// //       }
// //       catch(err){

// //       }
// //   }
// // }
// module.exports = router;
