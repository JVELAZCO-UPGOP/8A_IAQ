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
    
];

async function listarVeterinarios() {
    try{
        const respuesta = await fetch(url);
        const veterinariasDelServer = await respuesta.json();
        if (Array.isArray(veterinariasDelServer)) {
          veterinarias = veterinariasDelServer;
        }
        if (veterinarias.length > 0) {
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
return;
}

listaVeterinarias.innerHTML = `<tr>
    <td colspan="5" class="lista-vacia">No hay veterinarias</td>
  </tr>`;
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}
async function enviarDatos(evento) {
    evento.preventDefault();
    try{
   
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value,
        identificacion: identificacion.value                                                                                                      
    };
    const accion = btnGuardar.innerHTML;
    let urlEnvio = url;
    let method = "POST";
    if (accion === "Editar") {
      urlEnvio += `/${indice.value}`;
      method = "PUT";
    }
    const respuesta = await fetch(urlEnvio, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
        mode: "cors",
      });
      if (respuesta.ok) {
        listarVeterinarios();
        resetModal();
      }
    } catch (error) {
      console.log({ error });
      $(".alert").show();
    }
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
    
    };
}

function resetModal(){
    nombre.value = '';
    apellido.value = '';
    pais.value = '';
    identificacion.value = '';
    indice.value ='';
    btnGuardar.innerHTML ='Crear'
}
function eliminar(index) {
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar() {
      try {
        const respuesta = await fetch(urlEnvio, {
          method: "DELETE",
          mode: "cors",
        });
        if (respuesta.ok) {
          listarVeterinarias();
        }
      } catch (error) {
        console.log({ error });
        $(".alert").show();
      }
    };
  }
  

listarVeterinarios();

form.onsubmit = enviarDatos;
btnGuardar.onclick= enviarDatos;