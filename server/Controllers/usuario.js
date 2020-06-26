const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../Models/usuario');
const usuario = require('../Models/usuario');
const app = express();


//GET
app.get('/usuario', function(req, res) {
    res.json('GET Usuario')
});

//POST
app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // Para mostrar a la vuelta un campo en null
        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//PUT
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    // let body = req.body;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })

    // res.json({
    //     id
    // })
});

//DELETE
app.delete('/usuario', function(req, res) {
    res.json('DELETE Usuario')
});


module.exports = app;