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

module.exports = {
  getPosts,
  getPostId,
};