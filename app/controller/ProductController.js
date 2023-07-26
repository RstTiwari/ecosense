const { log } = require("console");
const ProductService = require("../service/ProductService")
const ProductHelper = require("../helper/helper")
const cloudinary = require("cloudinary").v2 ;
const fs = require("fs");


const ProductController = {
  getProducts: async function (req, res) {
    try {
      let { pageNo, limit } = req.body;

      if (!pageNo) {
        throw new Error("please provide valid pageNo");
      }

      if (!limit) {
        throw new Error("please provide valid limit");
      }

      let filter = {}; // filters can be passed here
      let select = { _id: 0, _v: 0 };
      let sort = { _id: -1 };
      let skip = (pageNo - 1) * limit;

      let productData = await ProductService.getProducts(
        filter,
        select,
        sort,
        skip,
        limit
      );

      if (productData.length < 1) {
        throw new Error("no product data found");
      }

      let response = {
        success: 1,
        data: productData,
      };
      res.send(response);
    } catch (error) {
      console.error(error);
      let response = {
        success: 0,
        message: error.message,
      };
      res.send(response);
    }
  },

  uploadImage: async function (req, res) {
    try {
      if (!req.file) {
        throw new Error("no file is attached");
      }
      let filename = req.file.path;
      let folder = filename;
      let uploadImage = await cloudinary.uploader.upload(filename, {
        public_id: folder,
      });

      if (!uploadImage.public_id) {
        throw new Error("failed to upload image");
      }

      let response = {
        success: 1,
        data: uploadImage.url,
      };

      res.send(response);
      fs.unlinkSync(filename);
    } catch (error) {
      console.error(error);
      let response = {
        success: 0,
        message: error.message,
      };
      res.send(response);
      fs.unlinkSync(filename);
    }
  },

  addProduct: async function (req, res) {
    try {
      let { title, desc, price, image } = req.body;
      if (!title) {
        throw new Error("please provide valid Title");
      }

      if (!desc) {
        throw new Error("please provide valid desc");
      }

      if (!price) {
        throw new Error("please provide valid price");
      }

      if (!image) {
        throw new Error("image url is missing");
      }
      let productId = ProductHelper.getProductCounter();
      let newProduct = {
        productId: productId,
        title: title,
        desc: desc,
        price: price,
        image: image,
      };

      let product = await ProductService.addProduct(newProduct);

      if (!product) {
        throw new Error("failed to add product");
      }
      let response = {
        success: 1,
        message: "product uploaded Successfully",
      };

      res.send(response);
    } catch (error) {
      console.error(error);
      let response = {
        success: 0,
        message: error.message,
      };

      res.send(response);
    }
  },

  updaterPoduct: async function (req, res) {
    try {
      let { productId, title, desc, price ,image} = req.body;
      if (!productId) {
        throw new Error("please provide valid ProductId");
      }
      if (!title) {
        throw new Error("please provide valid title");
      }
      if (!desc) {
        throw new Error("please provide valid desc");
      }
      if (!price) {
        throw new Error("please provide valid price");
      }
      if (!image) {
        throw new Error("please provide valid image");
      }

      let filter = { productId: productId };
      let updateObj = {
        $set: {
          title: title,
          desc: desc,
          price: price,
          image: image,
        },
      };

      let updatedData = await ProductService.updateProduct(filter, updateObj);

      if (!updatedData || updatedData.modifiedCount !== 1) {
        throw new Error("failed to update Data");
      }
      let response = {
        success: 1,
        message: "updated successfully",
      };
      res.send(response);
    } catch (error) {
      console.error(error);
      let response = {
        success: 0,
        message: error.message,
      };
      res.send(response);
    }
  },

  deleteProduct: async function (req, res){
    try {
      let {productId} = req.body;

      if (!productId) {
        throw new Error("please provide valid prodcutId");
      }

      let filter = {productId:productId}
      
      let deletedProduct = await ProductService.deleteProduct(filter);

      if(!deletedProduct || deletedProduct.deletedCount !== 1){
        throw new Error("failed to delete product")
      }

      let response = {
        success:1,
        message:"deleted successfully"
      };
      res.send(response)
    } catch (error) {

      console.error(error);
      let response = {
        success:0,
        message:error.message
      };

      res.send(response)
    }
  }
};

module.exports = ProductController;
