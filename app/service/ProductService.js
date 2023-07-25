const ProductModal = require("../models/ProductModal")

const ProductService = {
  getProducts: async function (filter, select, sort, skip, limit) {
    let data = [];
    try {
      data = await ProductModal.find(filter)
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .read("secondaryPreferred")
        .lean();
    } catch (error) {
      console.error(error);
    }
    return data;
  },
  addProduct:async function (obj){
    let data = null
    try {
      data = new ProductModal(obj);
      await data.save();
    } catch (error) {
      console.error(error);
    }
    return data
  }
};

module.exports = ProductService;