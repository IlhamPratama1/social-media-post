const Router = require("express");
const IndexController = require("../controllers/index.controller");
const authMiddleware = require("../middlewares/auth.middleware");
class HomeRoute {
  constructor() {
    this.path = "/";
    this.router = Router();
    this.indexController = new IndexController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.indexController.index);
    this.router.post("/file", authMiddleware, this.indexController.uploadImage);
    this.router.post("/file/register", this.indexController.uploadImage);
  }
}

module.exports = HomeRoute;
