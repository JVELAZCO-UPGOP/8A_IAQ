module.exports= function vetsHandler(vets){

    console.log("working here");
    return {
        get: (data, callback)=>{
            if (data.indice){
    
            if(vets[data.indice])
            {
               return callback(200,vets[data.indice]);
    
            }
            return callback(404, {mensaje:"indice no encontrado"});
            }
            callback(200, vets);
        },
    
    
        post: (data, callback)=>{
            vets.push(data.payload);
            callback(201,data.payload);
        },
        put: (data, callback)=>{
            if (data.indice){
    
            if(vets[data.indice])
            {
                vets[data.indice]= data.payload;
               return callback(200,vets[data.indice]);
    
            }
            return callback(404, {mensaje:"indice no encontrado"});
            }
            callback(400, {mensaje:"Indice no encontrado"});
        },
        delete: (data, callback)=>{
            if (data.indice){
    
            if(vets[data.indice])
            {
                vets=vets.filter((_vet, indice)=>
                 indice!=data.indice);
               return callback(204,{mensaje:"Elemento eliminado"});
    
    
            }
            return callback(404, {mensaje:"indice no encontrado"});
            }
            callback(400, {mensaje:"Indice no encontrado"});
        }
    }

}

