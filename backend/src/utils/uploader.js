const multer = require("multer");
const path = require("path");

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../static/images"));
  },
  filename: (req, file, cb) => {
    const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|PNG|jfif|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const UploadImageHandler = multer({
  fileFilter: imageFilter,
  storage: storageImage,
}).single("file");

module.exports = UploadImageHandler;
