const mongoose = require("mongoose");
const mongooseAutoPopulate = require("mongoose-autopopulate");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
    salesCount: {
        type: Number,
        default: 0,
    },
});

ProductSchema.plugin(mongooseAutoPopulate);
module.exports = mongoose.model("Product", ProductSchema);
