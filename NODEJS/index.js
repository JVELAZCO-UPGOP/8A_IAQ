const http = require('http');
const url = require('url');
const stringdecoder= require('string_decoder').StringDecoder;

let recursos= {
    mascotas:[
         {tipo:"Gato", nombre:"Felicia", duenio:"Neo"},
         {tipo:"Gato", nombre:"Felicia", duenio:"Neo"},
         { tipo:"Gato", nombre:"Felicia", duenio:"Neo" },
         { tipo:"Gato", nombre:"Felicia", duenio:"Neo" }

    ],
};
const callbackdelserver= (req, res)=>{
      //obtener url del request
  const urlactual= req.url;
  const urlparseada=url.parse(urlactual, true);
 
  //obtener la ruta
  const ruta= urlparseada.pathname;
  console.log(ruta);
    //  Quitar el /
    const rutalimpia= replace= ruta.replace(/^\/+|\/+$/g, '' );
    //obtener el metodo http
    const metodo= req.method.toLowerCase();
    
    //obtener variables del query url
    const { query={} }= urlparseada;
    //obtener los headers
    const { headers={} }= req;
//obtener payload 
const decoder= new stringdecoder('utf-8');
let buffer= '';
//Acumular la data
req.on('data', (data)=>{
buffer+= decoder.write(data);
});
//Terminar de acumular la data
req.on('end', ()=>{
    buffer+= decoder.end();
    //Organizar la data
    const data= {
        ruta:rutalimpia,
        query,
        metodo,
        headers,
        payload:buffer
    };

    console.log({data});
 //Elegir el handler de la ruta
 let handler;
 if(rutalimpia&&enrutador[rutalimpia]){
     handler= enrutador[rutalimpia];
 }
 else{
     handler=enrutador.noEncontrado;
 }
//enviar respuesta
  
if(typeof handler==='function'){
    handler(data, (statuscod=200, mensaje)=>{
const respuesta=JSON.stringify(mensaje);
res.setHeader("Content-Type","application/json");
res.writeHead(statuscod);

// Respuesta al cliente
res.end(respuesta);
    })
}
    

});
};
//Ejecutar handler para enviar la respuesta


    const enrutador={
        ruta:(data, callback)=>{
            callback(200,{mensaje:'Working'});
        },
        mascotas:(data, callback)=>{
            callback(200,recursos.mascotas)
        },
        noEncontrado:(data, callback)=>{
            callback(404, {mensaje:'Something went wrong'})
        }
    }
const server = http.createServer(callbackdelserver);


server.listen(5000, ()=>{
    console.log('El seridor esta escuchanco peticiones');
});