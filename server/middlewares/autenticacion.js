const jwt = require('jsonwebtoken');
const { response } = require('../Controllers/usuario');



//==============================
//  Verificar TOKEN
//==============================

let verificaToken = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEMILLA_TOKEN, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token invalido'
                }
            });
        }
        req.usuario = decode.usuario;
        next();
    });
};

//==============================
//  Verificar ADMIN ROLE
//==============================
let verificaAdmin_Role = (req, res, next) => {
    let rol = req.usuario.role;

    if (rol != 'ADMIN_ROLE') {
        return res.status(401).json({

            ok: false,
            err: {
                message: 'El usuario no tiene permisos para realizar la accion'
            }
        });
    }
    next();
}

//==============================
//  EXPORTACIONES
//==============================
module.exports = {
    verificaToken,
    verificaAdmin_Role
}