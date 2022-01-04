const mongooose = require("mongoose");

const productSchema = new mongooose.Schema({
  sellerId: {
    type: String,
    required: true,
  },
  pName: {
    type: String,
    required: true,
  },
  pDescription: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  prodImage: {
    type: String,
    required: true,
  },
  category: {
    type: Number,
    default: 1,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

const Product = mongooose.model("Product", productSchema);

module.exports = Product;

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// We are hashing the password
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = bcrypt.hash(this.password, 12);
//     this.cpassword = bcrypt.hash(this.cpassword, 12);
//   }
//   next();
// });

// Middleware for Generating Tokens
// userSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sigh({ _id: this._id.toString() }, process.env.SECRET_KEY);
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };

// Create the collection Model
