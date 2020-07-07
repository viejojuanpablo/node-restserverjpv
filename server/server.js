require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Config global de rutas
app.use(require('./Controllers'));

app.get('/', function(req, res) {
    res.json('Estamos activos')
});


mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, resp) => {
    if (err) throw err;
    console.log('La base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el spuerto ${process.env.PORT}`);
});