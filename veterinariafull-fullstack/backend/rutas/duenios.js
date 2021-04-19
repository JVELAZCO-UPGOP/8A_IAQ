module.exports= function dueniosHandler(duenios){

    console.log("working here");
    return {
        get: (data, callback)=>{
            if (data.indice){
    
            if(duenios[data.indice])
            {
               return callback(200,duenios[data.indice]);
    
            }
            return callback(404, {mensaje:"indice no encontrado"});
            }
            callback(200, duenios);
        },
    
    
        post: (data, callback)=>{
            duenios.push(data.payload);
            callback(201,data.payload);
        },
        put: (data, callback)=>{
            if (data.indice){
    
            if(duenios[data.indice])
            {
                duenios[data.indice]= data.payload;
               return callback(200,duenios[data.indice]);
    
            }
            return callback(404, {mensaje:"indice no encontrado"});
            }
            callback(400, {mensaje:"Indice no encontrado"});
        },
        delete: (data, callback)=>{
            if (data.indice){
    
            if(duenios[data.indice])
            {
                duenios=duenios.filter((_duenio, indice)=>
                 indice!=data.indice);
               return callback(204,{mensaje:"Elemento eliminado"});
    
    
            }
            return callback(404, {mensaje:"indice no encontrado"});
            }
            callback(400, {mensaje:"Indice no encontrado"});
        }
    }

}

