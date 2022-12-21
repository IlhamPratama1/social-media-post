const { compare, hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const prisma = require("../lib/prisma");
const { SECRET_KEY } = require("../config/index");
const { validateRegisterDto, validateLoginDto } = require("../dtos/auth.dto");
const { exclude } = require("../utils/util");
const HttpException = require("../exception/HttpException");

class AuthService {
  constructor() {
    this.users = prisma.user;
  }

  async register(userData) {
    const valid = validateRegisterDto(userData);
    if (!valid) throw new HttpException(400, validateRegisterDto.errors[0].message);

    const findUserEmail = await this.users.findUnique({
      where: { email: userData.email },
    });
    if (findUserEmail) throw new HttpException(400, "Duplicate Email");

    const findUsername = await this.users.findUnique({
      where: { username: userData.username },
    });
    if (findUsername) throw new HttpException(400, "Duplicate Username");

    const hashedPassword = await hash(userData.password, 10);
    const createUserData = await this.users.create({ data: { ...userData, password: hashedPassword } });

    const user = exclude("password", createUserData);
    return user;
  }

  async login(userData) {
    const valid = validateLoginDto(userData);
    if (!valid) throw new HttpException(400, validateLoginDto.errors[0].message);

    const findUser = await this.users.findUnique({ where: { username: userData.username } });
    if (!findUser) throw new HttpException(401, "Username not found");

    const isPasswordMatching = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(401, "Invalid password");

    return this.createToken(findUser);
  }

  async logout(userData) {
    const findUser = await this.users.findFirst({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(400, "Invalid token");
    return null;
  }

  createToken(user) {
    const dataStoredInToken = { id: user.id };
    const secretKey = SECRET_KEY;

    // Expired in 15 minutes
    const expiresIn = 15 * 60;
    const token = sign(dataStoredInToken, secretKey, { expiresIn });

    return { token: token };
  }
}

module.exports = AuthService;
