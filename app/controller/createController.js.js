const Shop = require("../models/shopModal");
const Product = require("../models/ProductModal");

class ShopController {
    async createShop(req, res) {
        const { name, contact, email, gstNumber, address, geoLocation } =
            req.body;
        try {
            const shop = new Shop({
                name,
                contact,
                email,
                gstNumber,
                address,
                geoLocation,
            });
            await shop.save();
            res.status(201).json(shop);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async addProduct(req, res) {
        const { name, category, price } = req.body;
        const { shopId } = req.params;
        console.log(shopId, "--");
        try {
            const product = new Product({ name, category, price, shopId });
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async uploadImage(req, res) {}
}

module.exports = new ShopController();
