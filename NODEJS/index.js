const http = require('http');

const callbackdelserver= (req, res)=>{
    res.end('HolaMundo');
};
const server = http.createServer(callbackdelserver);


server.listen(5000, ()=>{
    console.log('El seridor esta escuchanco peticiones');
});