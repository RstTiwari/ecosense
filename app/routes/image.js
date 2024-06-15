const multer = require("multer");
const fs = require("fs");

const { validate } = require("../midleWare/auth");
const CreateController = require("../controller/CreateController.js");

let folder = "assets/";
if (!fs.existsSync(folder)) {
    fs.mkdirSync("assets/");
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

module.exports = function (app) {
    app.route("/ecosense/uploadImage").post(
        upload.single("image"),
        CreateController.uploadImage
    );
};
