module.exports={

    ruta: (data, callback)=>{
            callback(200,{mensaje:'Working'});
        
    },
    mascotas:{
        get: (data, callback)=>{
            if (data.indice){

            if(global.recursos.mascotas[data.indice])
            {
               return callback(200,global.recursos.mascotas[data.indice]);

            }
            return callback(404, {mensaje:"indice no encontrado"});
            }
            callback(200, global.recursos.mascotas);
        },
    
    
        post: (data, callback)=>{
            global.recursos.mascotas.push(data.payload);
            callback(201,data.payload);
        },
    },
    noEncontrado:(data, callback)=>{
     
        callback(404, {mensaje:'Something went wrong'});
    }
}