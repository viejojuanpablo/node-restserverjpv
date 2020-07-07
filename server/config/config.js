//==============================
// PUERTO
//==============================
process.env.PORT = process.env.PORT || 3000;



//==============================
// ENTORNO
//==============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//==============================
// BASE DE DATOS
//==============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


//==============================
// TOKEN - Fecha de expiracion 
//==============================

process.env.CADUCIDAD_TOKEN = '30d';

//==============================
// TOKEN - seed de autenticacion 
//==============================

process.env.SEMILLA_TOKEN = process.env.SEMILLA_TOKEN || 'este-es-el-seed-desarrollo';

//==============================
//  
//==============================


//==============================
//  
//==============================


//==============================
//  
//==============================


//==============================
//  
//==============================