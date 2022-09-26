const postService = require('../services/post');
const { BlogPost } = require('../models');

const getPosts = async (_req, res) => {
  const result = await postService.getPosts();

  return res.status(200).json(result);
};

const getPostId = async (req, res) => {
  const { id } = req.params;

  const findId = await BlogPost.findByPk(id);
  if (!findId) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  const result = await postService.getPostId(id);

  return res.status(200).json(result);
};

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { id: userId } = req.user;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { error, blogPostUpdated } = await postService.updatePost({ id, title, content, userId });

  if (error && error.type === 'unauthorized') {
    const err = new Error(error.message);
    err.statusCode = 401;
    return next(err);
  }

  return res.status(200).json(blogPostUpdated);
};

module.exports = {
  getPosts,
  getPostId,
  updatePost,
};