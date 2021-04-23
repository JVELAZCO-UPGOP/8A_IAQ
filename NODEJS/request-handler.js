
const url = require('url');
const stringdecoder= require('string_decoder').StringDecoder;
const enrutador= require("./enrutador");

module.exports= (req, res)=>{
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
  
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, DELETE, POST"
  );

  if (metodo === "options") {
   
    res.writeHead(204);
    res.end();
    return;
  }
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

  if(headers['content-type']==='application/json'){
      console.log("yeah");
      buffer=JSON.parse(buffer);
  }
  else{
      console.log("nope");
  }
  
  //Verificar si tiene subrutas(indice);
  if(rutalimpia.indexOf("/")>-1){
      //Separar rutas
     var [rutaPrincipal,indice,]=rutalimpia.split("/");
      
  }
  //Organizar la data
  const data= {
      indice,
      ruta:rutaPrincipal || rutalimpia,
      query,
      metodo,
      headers,
      payload:buffer
  };



  console.log({data});
//Elegir el handler de la ruta
let handler;
if(data.ruta&&enrutador[data.ruta]&&enrutador[data.ruta][metodo]){
   handler= enrutador[data.ruta][metodo];
}
else{
   handler=enrutador.noEncontrado;
}
//enviar respuesta

if(typeof handler==='function'){
  handler(data, (statuscod=200, mensaje)=>{
const respuesta=JSON.stringify(mensaje);
res.setHeader("content-type","application/json");
res.writeHead(statuscod);

// Respuesta al cliente
res.end(respuesta);
  })
}
  

});
};