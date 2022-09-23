const { Category } = require('../models');

const categoryCreate = async ({ name }) => {
  const result = await Category.create({ name });

  return result;
};

const getCategories = async () => {
  const result = await Category.findAll();

  return result;
};

module.exports = {
  categoryCreate,
  getCategories,
};