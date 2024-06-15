const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gstNumber: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    geoLocation: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
});

module.exports = mongoose.model("Shop", ShopSchema);
