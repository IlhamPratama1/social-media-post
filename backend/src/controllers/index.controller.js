const HttpException = require("../exception/HttpException");
const UploadImageHandler = require("../utils/uploader");

class IndexController {
  index = (req, res) => {
    try {
      return res.status(200).send({
        message: "Hello, server is running",
      });
    } catch (error) {
      return res.status(404).send({
        message: error,
      });
    }
  };

  uploadImage = (req, res, next) => {
    try {
      UploadImageHandler(req, res, async (err) => {
        if (err) throw new HttpException(422, "Content Upload Error");

        const file = req.file;
        const imagePath = `${req.protocol}://${req.get("host")}/static/images/${file.filename}`;

        return res.status(201).json({
          success: true,
          message: "Successfully Upload Image",
          data: {
            id: 1,
            url: imagePath,
            filename: file.filename,
            mimetype: file.mimetype,
          },
        });
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = IndexController;
