const http = require('http');
const url = require('url');
const stringdecoder= require('string_decoder').StringDecoder;

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
const decoder= new StringDecoder('utf-8');
    //enviar respuesta
  
switch(rutalimpia){
    case 'ruta':
        res.end('Ruta conocida');
        break;
        default:
            res.end('Ruta desconocida');
}
    
};
const server = http.createServer(callbackdelserver);


server.listen(5000, ()=>{
    console.log('El seridor esta escuchanco peticiones');
});