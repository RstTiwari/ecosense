const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc:{
    type:String,
    required:true
  },
  image: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model("product",productSchema,"product")