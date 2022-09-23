const userService = require('../services/user');

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

module.exports = {
  login,
  userCreate,
};
