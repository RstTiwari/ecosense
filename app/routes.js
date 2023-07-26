const multer = require("multer")
const fs = require("fs")

const ProductController =  require("./controller/ProductController")
const {validate} = require("../app/midleWare/auth")

let folder = "assets/"
if(!fs.existsSync(folder)){
    fs.mkdirSync("assets/")
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});
const upload = multer({ storage: storage });



module.exports = function (app){
    // all the end point will come here
    app.route("/idealake/getProducts").get(ProductController.getProducts);
    app
      .route("/idealake/uploadImage")
      .post(upload.single("image"),ProductController.uploadImage);

    app.route("/idealake/addProduct").post(ProductController.addProduct);
    app.route("/idealake/updateProduct").post(ProductController.updaterPoduct);
    app.route("/idealake/deleteProduct").post(ProductController.deleteProduct);



}