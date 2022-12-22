// Lib
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const prisma = require("./lib/prisma");
const ErrorHandler = require("./exception/ErrorHandler");

// Config
const { PORT, ORIGIN, CREDENTIALS } = require("./config/index");

// Route
const HomeRoute = require("./routes/index.routes");
const AuthRoute = require("./routes/auth.routes");
const UserRoute = require("./routes/user.routes");
const PostRoute = require("./routes/post.routes");

class App {
  constructor() {
    this.app = express();
    this.port = PORT || 3000;
    this.routes = [new HomeRoute(), new AuthRoute(), new UserRoute(), new PostRoute()];

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializePrisma();
  }

  listen() {
    try {
      this.app.listen(this.port, () => {
        console.log(`=================================`);
        console.log(`🚀 App listening on the port ${this.port}`);
        console.log(`=================================`);
      });
    } catch (error) {
      console.error(`Error occured: ${error}`);
    }
  }

  initializeRoutes() {
    this.routes.forEach((route) => {
      this.app.use("/", route.router);
    });
    this.app.use(ErrorHandler);
  }

  initializeMiddlewares() {
    this.app.use(morgan("combined"));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/static", express.static(path.join(__dirname, "../static")));
  }

  initializePrisma() {
    prisma
      .$connect()
      .then(() => {
        console.log(`== Prisma Connected to Database ==`);
        console.log(`==================================`);
      })
      .catch(() => {
        console.log(`Error Connecting Prisma to Database`);
        console.log(`===================================`);
      });
  }
}

module.exports = App;
