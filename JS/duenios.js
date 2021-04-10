const listaDuenos=document.getElementById('lista-duenos');
const pais=document.getElementById('pais');
const id=document.getElementById('identificacion');
const nombre=document.getElementById('nombre');
const apellido= document.getElementById('apellido');
const form= document.getElementById('form');
const indice= document.getElementById('indice');
const btnGuardar=document.getElementById('btn-guardar');


let duenos=[
    {
        
        nombre: "Fernando",
        apellido: "Cabral",
        pais: " Rusia",
        id: "8565245"
    },
    {
        nombre: "Alberto",
        apellido: "Del Rio",
        pais: "México",
        id: "180456235"
    }
];

function listarDuenios() {
    const htmlDuenos =duenos.map((dueno, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${dueno.id}</td>
    <td>${dueno.pais}</td>
    <td>${dueno.nombre}</td>
    <td>${dueno.apellido}</td>
    <td>
        <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
        
    </div>
    </td>
</tr>`).join("");
listaDuenos.innerHTML = htmlDuenos;
Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=> botonEditar.onclick= editar(index));
Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=> botonEliminar.onclick= eliminar(index));
}

function enviarDatos(evento) {
    evento.preventDefault();
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value,
        id: identificacion.value                                                                                                      
    };
    console.log (datos);
    const accion = btnGuardar.innerHTML;
    switch(accion){
        case 'Editar':
            
            duenos[indice.value] = datos;
            break;
            default:
                
                duenos.push(datos);
                break;
    }

        resetModal();
      listarDuenios();
}
function editar(index){
    return function cuandoHagaClick (){
    btnGuardar.innerHTML = 'Editar'
    
    $('#exampleModalCenter').modal('toggle');
    
    const dueno = duenos[index];
   
    nombre.value = dueno.nombre;
    apellido.value = dueno.apellido;
    pais.value = "Mex";
    
    identificacion.value = dueno.id;
    indice.value = index;
    
}
}

function resetModal(){
    nombre.value = '';
    apellido.value = '';
    pais.value = '';
    identificacion.value = '';
    indice.value ='';
    btnGuardar.innerHTML ='Crear'
}
function eliminar(index){
    return function clickenEliminar(){
        
        duenos = duenos.filter((dueno, indicedueno)=>indicedueno !==index);
        listarDuenios();
    }


}
btnGuardar.onclick= enviarDatos;
listarDuenios();

form.onsubmit = enviarDatos;
