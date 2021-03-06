const listaDuenos=document.getElementById('lista-duenos');
const pais=document.getElementById('pais');
const id=document.getElementById('identificacion');
const nombre=document.getElementById('nombre');
const apellido= document.getElementById('apellido');
const form= document.getElementById('form');
const indice= document.getElementById('indice');
const btnGuardar=document.getElementById('btn-guardar');
const url = "https://veterinaria-backend-ten-kohl.vercel.app/duenios";

let duenos=[
    //Empty object
];

async function listarDuenios() {
    try{
      console.log('Dentro del try');
        const respuesta = await fetch("https://veterinaria-backend-ten-kohl.vercel.app/duenios");
    const duenosDelServer = await respuesta.json();
    if (Array.isArray(duenosDelServer)) {
      duenos = duenosDelServer;
    }
    if (duenos.length > 0) {
      console.log(duenos);
    const htmlDuenos =duenos.map(
        (dueno, index)=>`<tr>
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

return;
}

    
    listaDuenos.innerHTML = `<tr>
    <td colspan="5" class="lista-vacia">No hay duenios</td>
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
        id: identificacion.value                                                                                                      
    };
    console.log (datos);
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
      listarDuenios();
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
function eliminar(index) {
  console.log('Dentro de eliminar');
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar() {
      try {
        const respuesta = await fetch(urlEnvio, {
          method: "DELETE",
          mode: "cors",
        });
        if (respuesta.ok) {
          listarDuenios();
        }
      } catch (error) {
        console.log({ error });
        $(".alert").show();
      }
    };
  }
btnGuardar.onclick= enviarDatos;
listarDuenios();

form.onsubmit = enviarDatos;
