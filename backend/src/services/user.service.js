const { compare, hash } = require("bcrypt");
const prisma = require("../lib/prisma");
const { excludeAll } = require("../utils/util");
const HttpException = require("../exception/HttpException");
const { validateUpdateUser, validateChangePassword } = require("../dtos/user.dto");

class UserService {
  constructor() {
    this.users = prisma.user;
  }

  async getUserById(userId) {
    const findUser = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(400, "Data not found");
    const user = excludeAll(["password"], findUser);
    return user;
  }

  async updateUserById(userId, userData) {
    const valid = validateUpdateUser(userData);
    if (!valid) throw new HttpException(400, validateUpdateUser.errors[0].message);

    const findUser = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(400, "Data not found");

    const updateUserData = await this.users.update({ where: { id: userId }, data: { ...userData } });
    const user = excludeAll(["id", "password"], updateUserData);
    return user;
  }

  async changePasswordUser(userId, userData) {
    const valid = validateChangePassword(userData);
    if (!valid) throw new HttpException(400, validateChangePassword.errors[0].message);

    const findUser = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(400, "Data not found");

    const isPasswordMatching = await compare(userData.oldPassword, findUser.password);
    if (!isPasswordMatching) throw new HttpException(400, "Password not found");

    if (userData.newPassword !== userData.confirmNewPassword) throw new HttpException(400, "Password not match");

    const hashedPassword = await hash(userData.newPassword, 10);
    const user = await this.users.update({ where: { id: userId }, data: { password: hashedPassword } });

    return user;
  }
}

module.exports = UserService;
