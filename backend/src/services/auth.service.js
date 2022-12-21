const { compare, hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const prisma = require("../lib/prisma");
const { SECRET_KEY } = require("../config/index");
const { isEmpty } = require("../utils/util");

class AuthService {
  constructor() {
    this.users = prisma.user;
  }

  register() {}

  login() {}

  logout() {}
}
