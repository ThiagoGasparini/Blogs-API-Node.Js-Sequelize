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

module.exports = {
  login,
  userCreate,
};