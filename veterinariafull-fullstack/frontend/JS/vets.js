const listaVeterinarios=document.getElementById('lista-veterinarios');
const pais=document.getElementById('pais');
const identificacion=document.getElementById('identificacion');
const nombre=document.getElementById('nombre');
const apellido= document.getElementById('apellido');
const form= document.getElementById('form');
const indice= document.getElementById('indice');
const btnGuardar=document.getElementById('btn-guardar');
const newvet=document.getElementById('newvet');

function smth()
{
    indice.value="";
    if(!indice.value){
        btnGuardar.innerHTML="Crear";
    }
    else{
        console.log(indice.value);
    }
    resetModal();
}

console.log("working");
let veterinarios=[
    {
        
        nombre: "Alberto",
        apellido: "Ocoa",
        pais: "Colombia",
        identificacion: "8711453269"
    },
    {
        nombre: "Fernando ",
        apellido: "Villa",
        pais: "Otro",
        identificacion: "614529874"
    }
];

function listarVeterinarios() {
    const htmVeterinarios =veterinarios.map((veterinario, index)=>`<tr>
    <th scope="row">${index}</th>
    <td>${veterinario.identificacion}</td>
    <td>${veterinario.pais}</td>
    <td>${veterinario.nombre}</td>
    <td>${veterinario.apellido}</td>
    <td>
        <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
        
    </div>
    </td>
</tr>`).join("");
listaVeterinarios.innerHTML = htmVeterinarios;
Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=> botonEditar.onclick= editar(index));
Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=> botonEliminar.onclick= eliminar(index));
}

function enviarDatos(evento) {
    evento.preventDefault();
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value,
        identificacion: identificacion.value                                                                                                      
    };
    const accion = btnGuardar.innerHTML;
    switch(accion){
        case 'Editar':
            //Editar
            veterinarios[indice.value] = datos;
            break;
            default:
                //crear
                veterinarios.push(datos);
                break;
    }
listarVeterinarios();
resetModal();
}
function editar(index){
    return function cuandoHagaClick (){
    btnGuardar.innerHTML = 'Editar'
    $('#exampleModalCenter').modal('toggle');
    const veterinario = veterinarios[index];
    nombre.value = veterinario.nombre;
    apellido.value = veterinario.apellido;
    pais.value = veterinario.pais;
    identificacion.value = veterinario.identificacion;
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
        
        veterinarios = veterinarios.filter((veterinario, indiceveterinario)=>indiceveterinario !==index);
        listarVeterinarios();
    }
    

}

listarVeterinarios();

form.onsubmit = enviarDatos;
btnGuardar.onclick= enviarDatos;