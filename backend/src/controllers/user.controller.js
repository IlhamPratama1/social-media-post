const UserService = require("../services/user.service");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getUserById = async (req, res, next) => {
    try {
      const user = await this.userService.getUserById(req.user.id);
      res.status(200).json({
        success: true,
        message: "Successfully Get User",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  updateUserById = async (req, res, next) => {
    try {
      const user = await this.userService.updateUserById(req.user.id, req.body);
      res.status(200).json({
        success: true,
        message: "Successfully Update User",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  changeUserPassword = async (req, res, next) => {
    try {
      await this.userService.changePasswordUser(req.user.id, req.body);
      res.status(200).json({
        success: true,
        message: "Successfully Change Password",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
