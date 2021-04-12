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
        put: (data, callback)=>{
            if (data.indice){

            if(global.recursos.mascotas[data.indice])
            {
                global.recursos.mascotas[data.indice]= data.payload;
               return callback(200,global.recursos.mascotas[data.indice]);

            }
            return callback(404, {mensaje:"indice no encontrado"});
            }
            callback(400, {mensaje:"Indice no encontrado"});
        },
        delete: (data, callback)=>{
            if (data.indice){

            if(global.recursos.mascotas[data.indice])
            {
                global.recursos.mascotas=global.recursos.mascotas.filter((_mascota, indice)=>
                 indice!=data.indice);
               return callback(204,{mensaje:"Elemento eliminado"});


            }
            return callback(404, {mensaje:"indice no encontrado"});
            }
            callback(400, {mensaje:"Indice no encontrado"});
        }
    },
    noEncontrado:(data, callback)=>{
     
        callback(404, {mensaje:'Something went wrong'});
    }
}