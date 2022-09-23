const serviceCategory = require('../services/category');

const categoryCreate = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  const result = await serviceCategory.categoryCreate({ name });

  return res.status(201).json(result);
};

module.exports = {
  categoryCreate,
};
