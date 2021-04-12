const http = require('http');
const requestHandler= require("./request-handler");
const recursos= require("./recursos");
global.recursos=recursos;

//Ejecutar handler para enviar la respuesta


   
const server = http.createServer(requestHandler);


server.listen(5000, ()=>{
    console.log('El seridor esta escuchanco peticiones');
});