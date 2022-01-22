const mongooose = require("mongoose");

const locationSchema = new mongooose.Schema({
  shopId: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
});

const shoplocation = mongooose.model("Shop Location", locationSchema);

module.exports = shoplocation;
