const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

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

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

const validateUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const fields = { displayName, email, password, image };
  const { error } = userSchema.validate(fields);

  const user = await User.findOne({ where: { email: req.body.email } }); 
  console.log(user);
  if (user) return res.status(409).json({ message: 'User already registered' }); 

  if (error) return res.status(400).json({ message: error.message });
  
  next();
};

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    jwt.verify(authorization, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = {
  validateLogin,
  validateUser,
  validateToken,
};