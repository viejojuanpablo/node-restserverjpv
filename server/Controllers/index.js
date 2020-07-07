const express = require('express');
const app = express();

// referenciar controller de las rutas /usuario/...
app.use(require('./usuario'));
app.use(require('./login'));

module.exports = app;