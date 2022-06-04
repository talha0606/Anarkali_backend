// Product Schema added
const Product = require("../model/productSchema");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

// import Cloudinary and Multer files to store images in Cloudinary
// const cloudinary = require("../utils/cloudinary");
const cloudinary = require("cloudinary");

const upload = require("../utils/multer");
const ApiFeatures = require("../utils/apifeatures");

exports.singleproduct =
  // (upload.single("prodImage"),
  async (req, res) => {
    try {
      console.log("\nProduct addition api");
      // const myCloud = await cloudinary.uploader.upload(req.body.prodImage, {
      //   folder: "products",
      //   width: 150,
      //   crop: "scale",
      // });

      console.log("id: " + req.body.sellerId);
      console.log("name: " + req.body.pName);
      console.log("desc: " + req.body.pDescription);
      // console.log("file: " + req.file);

      const {
        sellerId,
        pName,
        pDescription,
        price,
        prodImage,
        category,
        brand,
        stock,
      } = req.body;
      console.log(
        `${pName}, ${pDescription}, ${price}, ${category}, ${prodImage}`
      );

      // const result = await cloudinary.uploader.upload(req.file.path);
      // console.log("Result : " + result);

      if (!pName || !pDescription || !price || !category || !brand || !stock) {
        return res.status(402).send("Please filled the empty field properly");
      }

      // const productExist = await Product.findOne({ _id: req.body.id });

      if (false) {
        //       // console.log("if......Product addition api");
        //       // console.log("iddddd: " + req.body.id);
        //       // console.log("name: " + req.body.pName);
        //       // const updated = Product.updateOne(
        //       //   { pName: req.body.pName },
        //       //   {
        //       //     $set: {
        //       //       price: req.body.price,
        //       //     },
        //       //   }
        //       // );
        //       // console.log("Upadated value: " + updated);
      } else {
        const prod = await new Product({
          sellerId: sellerId,
          pName: pName,
          pDescription: pDescription,
          price: price,
          // prodImage: myCloud.secure_url,
          category: category,
          brand: brand,
          stock: stock,
        });

        prod
          .save()
          .then((resu) => {
            console.log("New Product Added");
            res.status(201).json({
              success: true,
              prod,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(`Error : ${error.Message}`);
    }
  };

exports.productadded = async (req, res) => {
  console.log("Product Added Again");
  const updated = await Product.updateOne(
    { _id: req.body.id },
    { $set: { prodImage: req.body.prodImage } }
  );
  if (updated) {
    console.log("Updated Product Added Again");
    res.status(200).json({ added: "Image Added Successfully" });
  }
};

exports.searchProduct = async (req, res) => {
  const searchString = req.query.name;

  // const cities = await City.find({
  //   city: { $regex: req.query.val, $options: "i" },
  // }).limit(5);

  // db.inventory.find({ $or: [{ quantity: { $lt: 20 } }, { price: 10 }] });
  try {
    const Products = await Product.find({
      $or: [
        { pName: { $regex: req.query.name, $options: "i" } },
        { pDescription: { $regex: req.query.name, $options: "i" } },
        { brand: { $regex: req.query.name, $options: "i" } },
      ],
    }).limit(5);

    console.log(Products);
    res.status(200).send(Products);
  } catch (err) {
    console.log("Error: " + err);
  }
};

exports.updateProduct =
  (upload.single("image"),
  async (req, res) => {
    console.log("Update Product ApI: " + req.body.id);
    console.log("Path: " + req.file);
    const {
      sellerId,
      id,
      pName,
      pDescription,
      price,
      prodImage,
      category,
      brand,
      stock,
    } = req.body;
    // console.log("ABC: " + abc);

    if (req.file === undefined) {
      const updated = await Product.updateOne(
        { _id: id },
        {
          $set: {
            sellerId,
            pName,
            pDescription,
            price,
            prodImage,
            category,
            brand,
            stock,
          },
        }
      );
      console.log("In If clause: After upadated api");
      if (updated) res.status(200).json({ done: "upadated ho gai yrr" });
    } else {
      // console.log("AnbhbBC: " + abc);
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log("Secure URL: " + result.secure_url);
      const updated = await Product.updateOne(
        { _id: req.body.id },
        {
          $set: {
            sellerId,
            pName,
            pDescription,
            price,
            prodImage: result.secure_url,
            category,
            brand,
            stock,
          },
        }
      );
      console.log("In Else Clause: After upadated api");
      if (updated) res.status(200).json({ done: "upadated ho gai yrr" });
    }
  });

exports.deleteproduct = async (req, res) => {
  try {
    console.log("Delete Product API..." + req.query.id);
    const deleted = await Product.deleteOne({ _id: req.query.id });
    console.log("Delete Product API..." + deleted);

    if (deleted) {
      res.status(200).send("Product Deleted Successfully");
    }
  } catch (err) {
    console.log("DeleteProductError: " + err.Message);
  }
};

exports.prodinfo = async (req, res) => {
  console.log("ProductInfo API");
  const prodData = await Product.find({ _id: req.query.id });
  res.send(prodData);
};

exports.prod_by_id = async (req, res) => {
  console.log("In Shop Detail API");

  let type = req.query.type;
  let prodId = req.query.id;

  console.log(req.query.type);
  console.log(prodId);

  // if (type === "array") {
  // }

  const prod = await Product.findOne({ _id: prodId });
  if (!prod) {
    throw new Error("Shop not found");
  } else {
    console.log("Product found");
  }
  console.log(prod);

  res.send(prod);
};

exports.myproducts = async (req, res) => {
  try {
    console.log("Seller Id: " + req.query.id);
    console.log("Myproducts API");
    // const myproducts = await Product.find({ sellerId: req.query.id });
    const myproducts = await Product.find(
      { sellerId: req.query.id },
      function (err, myproducts) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          // console.log("Myproducts: " + myproducts);
          res.status(200).send(myproducts);
        }
      }
    );
    // console.log("Myproducts:" + myproducts);
    // res.send(myproducts);
  } catch (err) {
    console.log(err.Message);
  }
};

exports.allproducts = async (req, res) => {
  try {
    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    let myproducts = await apiFeature.query;

    let filteredProductsCount = myproducts.length;

    apiFeature.pagination(resultPerPage);

    myproducts = await apiFeature.query;

    // const myproducts = await Product.find({});
    console.log("Myproducts:" + myproducts);
    res.status(200).json({
      success: true,
      myproducts,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  } catch (err) {
    console.log("error oye");
    console.log(err);
  }
};

// ---------------------------On the way---------------------
// router.get("/myProducts", async (req, res) => {
//   try {
//     console.log("Seller Id: " + req.query.id);
//     console.log("MyProducts API");

//     const myproducts = await Product.find({
//       sellerid: req.query.id},
//       function (err, myproducts){
//         if(err){
//           console.log(err);
//           res.status(500).send(err);

//         }
//         else
//         {
//           cout << "show something";
//         }
//       }
//       catch(err){

//       }
//   }
// }

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
