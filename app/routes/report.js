const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController");
const { validate } = require("../midleWare/auth");

router.get(
    "/reports/top-selling-products",
    validate, //Admin Autherized
    reportController.topSellingProducts
);
router.get(
    "/reports/top-selling-categories", // Adminhj Authorized
    validate,
    reportController.topSellingCategories
);

module.exports = router;
