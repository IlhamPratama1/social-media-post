const PostService = require("../services/post.service");

class PostController {
  constructor() {
    this.postService = new PostService();
  }

  getPostList = async (req, res, next) => {
    try {
      const { post, pagination } = await this.postService.getPostList(req.query, req.user.id);
      return res.status(201).json({
        success: true,
        message: "Successfully Get Post",
        data: post,
        pagination: pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserPostList = async (req, res, next) => {
    try {
      const { post, pagination } = await this.postService.getUserPostList(req.query, req.params.id);
      return res.status(201).json({
        success: true,
        message: "Successfully Get Post",
        data: post,
        pagination: pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  createPost = async (req, res, next) => {
    try {
      const postData = req.body;
      const data = await this.postService.createPost(req.user.id, postData);
      return res.status(201).json({
        success: true,
        message: "Successfully Create Post",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  getPostById = async (req, res, next) => {
    try {
      const data = await this.postService.getPostById(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Successfully Get Post",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePostById = async (req, res, next) => {
    try {
      const postData = req.body;
      const data = await this.postService.updatePost(req.params.id, postData);
      return res.status(200).json({
        success: true,
        message: "Successfully Update Post",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  deletePostById = async (req, res, next) => {
    try {
      await this.postService.deletePost(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Successfully Delete Post",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  likePostById = async (req, res, next) => {
    try {
      await this.postService.likePost(req.user.id, req.params.id);
      return res.status(200).json({
        success: true,
        message: "Successfully Liked Post",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  unlikePostById = async (req, res, next) => {
    try {
      await this.postService.unlikePost(req.user.id, req.params.id);
      return res.status(200).json({
        success: true,
        message: "Successfully Unlike Post",
        data: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = PostController;
