const Product = require("../models/ProductModal");

class ReportController {
    async topSellingProducts(req, res) {
        try {
            const products = await Product.find()
                .sort({ salesCount: -1 })
                .limit(10);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async topSellingCategories(req, res) {
        try {
            const categories = await Product.aggregate([
                {
                    $group: {
                        _id: "$category",
                        totalSales: { $sum: "$salesCount" },
                    },
                },
                { $sort: { totalSales: -1 } },
                { $limit: 10 },
            ]);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ReportController();
