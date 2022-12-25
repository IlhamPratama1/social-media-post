const Router = require("express");
const PostController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

class PostRoute {
  constructor() {
    this.path = "/post";
    this.router = Router();
    this.postController = new PostController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.postController.getPostList);
    this.router.get(`${this.path}/:id`, authMiddleware, this.postController.getPostById);
    this.router.get(`${this.path}/user/:id`, authMiddleware, this.postController.getUserPostList);
    this.router.post(`${this.path}`, authMiddleware, this.postController.createPost);
    this.router.put(`${this.path}/:id`, authMiddleware, this.postController.updatePostById);
    this.router.put(`${this.path}/like/:id`, authMiddleware, this.postController.likePostById);
    this.router.put(`${this.path}/unlike/:id`, authMiddleware, this.postController.unlikePostById);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.postController.deletePostById);
  }
}

module.exports = PostRoute;
