const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const HttpException = require("../exception/HttpException");
const prisma = require("../lib/prisma");

const authMiddleware = async (req, res, next) => {
  try {
    const Authorization = req.header("Authorization") ? req.header("Authorization").split("Bearer ")[1] : null;
    if (Authorization) {
      const secretKey = SECRET_KEY;
      const verificationResponse = await jwt.verify(Authorization, secretKey);
      const { id } = verificationResponse;

      const users = prisma.user;
      const findUser = await users.findUnique({ where: { id: Number(id) } });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, "Invalid token"));
      }
    } else {
      next(new HttpException(401, "No auth token"));
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new HttpException(401, "Expired token"));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new HttpException(401, "Invalid token"));
    }
  }
};

module.exports = authMiddleware;
