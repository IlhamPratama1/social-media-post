const Router = require("express");
const UserController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

class UserRoute {
  constructor() {
    this.path = "/user/";
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.userController.getUserById);
    this.router.put(`${this.path}`, authMiddleware, this.userController.updateUserById);
    this.router.put(`${this.path}change-password`, authMiddleware, this.userController.changeUserPassword);
  }
}

module.exports = UserRoute;
