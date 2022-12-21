const AuthService = require("../services/auth.service");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  register = async (req, res, next) => {
    try {
      const userData = req.body;
      const user = await this.authService.register(userData);
      res.status(201).json({
        success: true,
        message: "Your account has been successfully created",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const userData = req.body;
      const token = await this.authService.login(userData);
      res.status(200).json({
        success: true,
        message: "Successfully logged in",
        data: token,
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      const userData = req.user;
      await this.authService.logout(userData);
      res.status(200).json({
        success: true,
        message: "Successfully logout",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
