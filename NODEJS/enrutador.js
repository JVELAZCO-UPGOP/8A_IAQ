const recursos = require("./recursos");
const mascotas= require("./rutas/mascotas");
const veterinarios = require("./rutas/veterinarios");
const vets= require("./rutas/veterinarios");
const duenios= require("./rutas/duenios");
const consultas = require("./rutas/consultas");
module.exports={

    ruta: (data, callback)=>{
            callback(200,{mensaje:'Working'});
        
    },
   mascotas: mascotas(recursos.mascotas),
   veterinarios: veterinarios(recursos.vets),
   duenios: duenios(recursos.duenios),
   consultas: consultas(recursos.consultas),
    noEncontrado:(data, callback)=>{
     
        callback(404, {mensaje:'Something went wrong'});
    }
}