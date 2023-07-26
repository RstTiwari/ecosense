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
  addProduct: async function (obj) {
    let data = null;
    try {
      data = new ProductModal(obj);
      await data.save();
    } catch (error) {
      console.error(error);
    }
    return data;
  },

  updateProduct: async function (filter, updateObj) {
    let data = null;
    try {
      data = ProductModal.updateOne(filter, updateObj);
    } catch (error) {
      console.log(error);
    }
    return data;
  },

  deleteProduct:async function (filter){
    let data = null 
    try {
      data = await ProductModal.deleteOne(filter)
    } catch (error) {
      console.error(error);
    }
    return data
  }
};

module.exports = ProductService;