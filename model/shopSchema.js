const mongooose = require("mongoose");
const jwt = require("jsonwebtoken");

const shopSchema = new mongooose.Schema({
  sName: {
    type: String,
    required: true,
  },
  sDescription: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // shopImage: {
  //   type: String,
  //   required: true,
  // },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
    default: "Bags",
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

// Middleware for Generating Tokens
shopSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const Shop = mongooose.model("SHOP", shopSchema);

module.exports = Shop;

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

// Create the collection Model
