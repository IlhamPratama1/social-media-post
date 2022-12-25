const { validateCreatePost } = require("../dtos/post.dto");
const HttpException = require("../exception/HttpException");
const prisma = require("../lib/prisma");
const { isUndefined, excludeAll, exclude } = require("../utils/util");

class PostService {
  constructor() {
    this.posts = prisma.post;
    this.users = prisma.user;
    this.userLikes = prisma.userLiked;
  }

  async getPostList(query, userId) {
    const { searchBy, search, page = 1, limit = 8 } = query;
    let queryData = new Object();

    if (!isUndefined(searchBy) && !isUndefined(search)) {
      if (searchBy === "tags") {
        queryData[searchBy] = {
          contains: `#${search}`,
        };
      } else if (searchBy === "caption") {
        queryData[searchBy] = {
          contains: search.replace("+", " "),
        };
      }
    }

    const findPost = await this.posts.findMany({
      where: queryData,
      select: {
        id: true,
        caption: true,
        tags: true,
        image: true,
        likes: true,
        user: true,
        userLiked: {
          where: { userId: Number(userId) },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    const pagination = {
      total: findPost.length,
      page: Number(page),
      limit: Number(limit),
      totalPage: Math.ceil(findPost.length / Number(limit)),
      hasNextPage: Number(page) < Math.ceil(findPost.length / Number(limit)),
      hasPreviousPage: Number(page) > Math.ceil(findPost.length / Number(limit)),
    };
    const start = (Number(page) - 1) * Number(limit);
    const end = start + Number(limit);
    const data = findPost.slice(start, end);

    const post = data.map((obj) => {
      return { ...obj, user: excludeAll(["id", "password"], obj.user) };
    });

    return { post, pagination };
  }

  async getUserPostList(query, userId) {
    const { searchBy, search, page = 1, limit = 8 } = query;
    let queryData = new Object({ userId: { equals: Number(userId) } });

    if (!isUndefined(searchBy) && !isUndefined(search)) {
      if (searchBy === "tags") {
        queryData[searchBy] = {
          contains: `#${search}`,
        };
      } else if (searchBy === "caption") {
        queryData[searchBy] = {
          contains: search.replace("+", " "),
        };
      }
    }
    const findPost = await this.posts.findMany({
      where: queryData,
      select: {
        id: true,
        caption: true,
        tags: true,
        image: true,
        likes: true,
        user: true,
        userLiked: {
          where: { userId: Number(userId) },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    const pagination = {
      total: findPost.length,
      page: Number(page),
      limit: Number(limit),
      totalPage: Math.ceil(findPost.length / Number(limit)),
      hasNextPage: Number(page) < Math.ceil(findPost.length / Number(limit)),
      hasPreviousPage: Number(page) > Math.ceil(findPost.length / Number(limit)),
    };
    const start = (Number(page) - 1) * Number(limit);
    const end = start + Number(limit);
    const data = findPost.slice(start, end);

    const post = data.map((obj) => {
      return { ...obj, user: excludeAll(["id", "password"], obj.user) };
    });

    return { post, pagination };
  }

  async createPost(userId, postData) {
    const valid = validateCreatePost(postData);
    if (!valid) throw new HttpException(400, validateCreatePost.errors[0].message);

    const user = await this.users.findUnique({ where: { id: Number(userId) } });
    if (!user) throw new HttpException(400, "Data not found");

    const newPost = await this.posts.create({ data: { ...postData, likes: 0, userId: userId } });
    const post = { ...excludeAll(["id", "userId"], newPost), user: excludeAll(["id", "password"], user) };

    return post;
  }

  async updatePost(postId, postData) {
    const valid = validateCreatePost(postData);
    if (!valid) throw new HttpException(400, validateCreatePost.errors[0].message);

    const findPost = await this.posts.findUnique({ where: { id: Number(postId) }, include: { user: true } });
    if (!findPost) throw new HttpException(400, "Data not found");

    const updatedPost = await this.posts.update({ where: { id: Number(postId) }, data: { ...postData } });
    const post = {
      ...excludeAll(["id", "userId"], updatedPost),
      user: excludeAll(["id", "password"], findPost.user),
    };

    return post;
  }

  async deletePost(postId) {
    const findPost = await this.posts.findUnique({ where: { id: Number(postId) } });
    if (!findPost) throw new HttpException(400, "Data not found");

    await this.posts.delete({ where: { id: Number(postId) } });
    return null;
  }

  async getPostById(postId) {
    const findPost = await this.posts.findUnique({ where: { id: Number(postId) }, include: { user: true } });
    if (!findPost) throw new HttpException(400, "Data not found");

    const post = { ...exclude("userId", findPost), user: excludeAll(["id", "password"], findPost.user) };

    return post;
  }

  async likePost(userId, postId) {
    const findPost = await this.posts.findUnique({ where: { id: Number(postId) }, include: { user: true } });
    if (!findPost) throw new HttpException(400, "Data not found");

    const findUserLike = await this.userLikes.findFirst({
      where: { AND: [{ userId: Number(userId) }, { postId: Number(postId) }] },
    });
    if (findUserLike) throw new HttpException(400, "Already liked post");

    await prisma.$transaction([
      this.userLikes.create({
        data: {
          userId: Number(userId),
          postId: Number(postId),
        },
      }),
      this.posts.update({ where: { id: Number(postId) }, data: { likes: (findPost.likes += 1) } }),
    ]);
    return null;
  }

  async unlikePost(userId, postId) {
    const findPost = await this.posts.findUnique({ where: { id: Number(postId) }, include: { user: true } });
    if (!findPost) throw new HttpException(400, "Data not found");

    const findUserLike = await this.userLikes.findFirst({
      where: { AND: [{ userId: Number(userId) }, { postId: Number(postId) }] },
    });
    if (!findUserLike) throw new HttpException(400, "Already unliked post");

    await prisma.$transaction([
      this.userLikes.deleteMany({
        where: { userId: Number(userId), postId: Number(postId) },
      }),
      this.posts.update({ where: { id: Number(postId) }, data: { likes: (findPost.likes -= 1) } }),
    ]);
    return null;
  }
}

module.exports = PostService;
