const { BlogPost, Category, User } = require('../models');

const getPosts = async () => {
  const result = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: {
        exclude: ['password'],
      },
    }, {
      model: Category,
      as: 'categories',
    }],
  });

  return result;
};

const getPostId = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: {
        exclude: ['password'],
      },
    }, {
      model: Category,
      as: 'categories',
    }],
  });

  return result;
};

const updatePost = async (id, title, content, userId) => {
  const [updated] = await BlogPost.update(
    { title, content },
    { where: { id, userId } },
  );

  if (!updated) {
    return {
      error: {
        message: 'Unauthorized user',
        type: 'unauthorized',
      },
    };
  }
  
  const toBeUpdatedPost = await getPostId(id);

  return { blogPostUpdated: toBeUpdatedPost };
};

module.exports = {
  getPosts,
  getPostId,
  updatePost,
};