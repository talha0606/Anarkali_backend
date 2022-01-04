const mongooose = require("mongoose");

const fileSchema = new mongooose.Schema({
  shopImage: {
    type: String,
    required: true,
  },
});

const File = mongooose.model("File", fileSchema);

module.exports = File;
