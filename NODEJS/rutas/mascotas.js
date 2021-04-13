module.exports= function mascotasHandler(mascotas){

    console.log("working here");
    return {
        get: (data, callback)=>{
            if (data.indice){
    
            if(mascotas[data.indice])
            {
               return callback(200,mascotas[data.indice]);
    
            }
            return callback(404, {mensaje:"indice no encontrado"});
            }
            callback(200, mascotas);
        },
    
    
        post: (data, callback)=>{
            mascotas.push(data.payload);
            callback(201,data.payload);
        },
        put: (data, callback)=>{
            if (data.indice){
    
            if(mascotas[data.indice])
            {
                mascotas[data.indice]= data.payload;
               return callback(200,mascotas[data.indice]);
    
            }
            return callback(404, {mensaje:"indice no encontrado"});
            }
            callback(400, {mensaje:"Indice no encontrado"});
        },
        delete: (data, callback)=>{
            if (data.indice){
    
            if(mascotas[data.indice])
            {
                mascotas=mascotas.filter((_mascota, indice)=>
                 indice!=data.indice);
               return callback(204,{mensaje:"Elemento eliminado"});
    
    
            }
            return callback(404, {mensaje:"indice no encontrado"});
            }
            callback(400, {mensaje:"Indice no encontrado"});
        }
    }

}

