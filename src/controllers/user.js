const userService = require('../services/user');
const { User } = require('../models');

const login = async (req, res) => {
  const { email } = req.body;

  const result = await userService.login({ email });

  return res.status(200).json({ token: result });
};

const userCreate = async (req, res) => {
  const { displayName, email, password, image } = req.body;
     
  const result = await userService.userCreate({
    displayName,
    email,
    password,
    image,
  });

  /* const user = await User.findAll({ where: { emails: email } }); 
  if (user) return res.status(409).json({ message: 'User already registered' }); */

  return res.status(201).json({ token: result });
};

const getUsers = async (_req, res) => {
  const result = await userService.getUsers();

  return res.status(200).json(result);
};

const userById = async (req, res) => {
  const { id } = req.params;
  const findId = await User.findByPk(id);

  if (!findId) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  const result = await userService.userById(id);

  return res.status(200).json(result);
};

module.exports = {
  login,
  userCreate,
  getUsers,
  userById,
};
