const Router = require("express");
const AuthController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

class AuthRoute {
  constructor() {
    this.path = "/auth";
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.path}/register`, this.authController.register);
    this.router.post(`${this.path}/login`, this.authController.login);
    this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logout);
  }
}

module.exports = AuthRoute;
