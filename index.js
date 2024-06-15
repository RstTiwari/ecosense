"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
var app = express();

var bodyParser = require("body-parser");
const util = require("util");
const cors = require("cors");
require("dotenv").config();

var env = "prod";
var port = "4003";

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const shopRoutes = require("./app/routes/shop");
const reportRoutes = require("./app/routes/report");

app.use("/api", shopRoutes);
app.use("/api", reportRoutes);

// connection to cloudinary
cloudinary.config({
    cloud_name: process.env.cloudinaryName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret,
});

mongoose
    .connect(process.env.MDKEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(port, () =>
            console.log(`Server Running on Port: http://localhost:${port}`)
        )
    )
    .catch((error) => console.log(`${error} did not connect`));
