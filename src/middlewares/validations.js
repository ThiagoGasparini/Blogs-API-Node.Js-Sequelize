const { User } = require('../models/User');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const result = await User.findOne({ where: { email } });

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  if (!result) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  next();
};

module.exports = {
  validateLogin,
};