const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GoogleClientId);
const Usuario = require('../Models/usuario');
const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB)
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(Usuario) o contraseña incorrecta"
                }
            });

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o (contraseña) incorrecta"
                }
            });
        }

        let token = jwt.sign({ usuario: usuarioDB }, process.env.SEMILLA_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        })
    });


});


// Configuracion de google
async function verify(token) {
    console.log(process.env.GoogleClientId);
    const ticket = await client.verifyIdTokenAsync({
        idToken: token,
        audience: process.env.GoogleClientId, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}

app.post('/google', async(req, res) => {
    let token = req.body.idtoken;

    let googleUser = await verify(token)
        .catch(err => {
            return res.status(403).json({
                ok: false,
                err
            });
        });

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        // Si EXISTE el user en la bd
        if (usuarioDB) {
            // si se autentico por 1° vez con google
            if (usuarioDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    err: 'Debe autenticarse con usuario y contraseña'
                });
            } else {
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEMILLA_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN });

                res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token
                });
            };

        } else {
            // Si NO EXISTE el user en la bd
            let usuario = new Usuario();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = bcrypt.hashSync(':)', 10);

            usuario.save((err, usuarioDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                };

                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEMILLA_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN });

                res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token
                });

            });
        }
    });

});

module.exports = app;