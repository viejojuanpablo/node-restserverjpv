require('./config/config');
const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.json('Hello World')
});

// referenciar controller de las rutas /usuario/...
app.use(require('./Controllers/usuario'));


mongoose.connect('mongodb://localhost:27017/cafe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, resp) => {
    if (err) throw err;
    console.log('La base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el spuerto ${process.env.PORT}`);
});