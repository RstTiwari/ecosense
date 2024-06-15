const express = require("express");
const router = express.Router();
const shopController = require("../controller/createController.js");

router.post("/shops", shopController.createShop);
router.post("/shops/:shopId/products", shopController.addProduct);

module.exports = router;
