const express = require('express');
const {
  validateLogin,
  validateUser,
  validateToken,
  validateTokenAuth,
} = require('./middlewares/validations');
const userController = require('./controllers/user');
const categoryController = require('./controllers/category');
const postController = require('./controllers/post');

// ...

const app = express();

app.use(express.json());

app.post('/login', validateLogin, userController.login);

app.post('/user', validateUser, userController.userCreate);
app.get('/user', validateToken, userController.getUsers);
app.get('/user/:id', validateToken, userController.userById);

app.post('/categories', validateToken, categoryController.categoryCreate);
app.get('/categories/', validateToken, categoryController.getCategories);

app.get('/post', validateToken, postController.getPosts);
app.get('/post/:id', validateToken, postController.getPostId);
app.put(
  '/post/:id',
  validateToken,
  validateTokenAuth,
  postController.updatePost,
);
app.delete('/post/:id', validateToken, validateTokenAuth, postController.deletePost);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
