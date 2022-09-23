const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const login = async ({ email }) => {
  const result = await User.findOne({ where: { email } });

  const { JWT_SECRET } = process.env;

  const token = jwt.sign(
    { email: result.dataValues.email },
    JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '1d' },
  );
  return token;
};

const userCreate = async ({ displayName, email, password, image }) => {
  await User.create({ displayName, email, password, image });

  const token = login({ email });

  return token;
};

const getUsers = async () => {
  const result = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return result;
};

const userById = async (id) => {
  const result = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  
  return result;
};

module.exports = {
  login,
  userCreate,
  getUsers,
  userById,
};