const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  url: {
    type: String,
    minlength: 3,
    required: true,
  },
  urlCode: {
    type: String,
    required: true,
  },
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

module.exports = ShortUrl;
