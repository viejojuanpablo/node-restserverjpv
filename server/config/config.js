//==================
// PUERTO
//==================
process.env.PORT = process.env.PORT || 3000;



//==================
// ENTORNO
//==================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//==================
// BASE DE DATOS
//==================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://AdminJPV:BR2C7uwpKc5thrZo@clustercursonode.l2w78.mongodb.net/test'
}

process.env.URLDB = urlDB;