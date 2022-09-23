const express = require('express');
const { validateLogin } = require('./middlewares/validations');
const userController = require('./controllers/user');

// ...

const app = express();

app.use(express.json());

app.post('/login', validateLogin, userController.login);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
