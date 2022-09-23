const { Category } = require('../models');

const categoryCreate = async ({ name }) => {
  const result = await Category.create({ name });

  return result;
};

module.exports = {
  categoryCreate,
};