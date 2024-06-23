const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
