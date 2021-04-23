const listaMascotas = document.getElementById('lista-mascotas');
const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('duenio');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar=document.getElementById('save');
const create= document.getElementById('crear');
const url = "http://localhost:5000/mascotas";
console.log('mascotas');
function smth()
{
    indice.value="";
    if(!indice.value){
        btnGuardar.innerHTML="Crear";
    }
    else{
        console.log(indice.value);
    }
    clear();
}


let mascotas = [
    
    ];

async function listarMascotas() {
    console.log("Dentro de listar");
    try{
        const respuesta = await fetch(url);
        console.log({'respuesta': respuesta})
        const mascotasDelServer = await respuesta.json();
        if (Array.isArray(mascotasDelServer)) {
            mascotas = mascotasDelServer;
          }

          if (mascotas.length > 0) {
            
    console.log('Dentro de listar');
   

    const htmlMascotas = mascotas.map((mascota, index)=>`
    <tr>
                    <th scope="row">${index}</th>
                    <td>${mascota.tipo}</td>
                    <td>${mascota.nombre}</td>
                    <td>${mascota.duenio}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            
                            <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
                            
                        </div>
                    </td>
                </tr>`).join("");
      listaMascotas.innerHTML = htmlMascotas;
      Array.from(document.getElementsByClassName("editar")).forEach(
        (botonEditar, index) => (botonEditar.onclick = editar(index))
      );
      Array.from(document.getElementsByClassName("eliminar")).forEach(
        (botonEliminar, index) => (botonEliminar.onclick = eliminar(index))
      );
      return;
    }
    listaMascotas.innerHTML = `<tr>
        <td colspan="5" class="lista-vacia">No hay mascotas</td>
      </tr>`;
  } catch (error) {
    console.log({ error });
   
  }
}
async function enviarDatos(evento) {
    
    evento.preventDefault();
    try{

    const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        duenio: dueno.value
        
        };
        let method = "POST";
    let urlEnvio = url;
        const acc= btnGuardar.innerHTML;
        alert( acc)
        if (acc === "Editar") {
            method = "PUT";
            mascotas[indice.value] = datos;
            urlEnvio = `${url}/${indice.value}`;
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
            listarMascotas();
            resetModal();
          }
        } catch (error) {
          console.log({ error });
          $(".alert").show();
        }
      }
      

      
        
      
      form.onsubmit= enviarDatos;
      listarMascotas();

   

      btnGuardar.onclick= enviarDatos;

      function editar(index){
          return function handler()
          {
        const mascota= mascotas[index];
        

        nombre.value=mascota.nombre;
        duenio.value=mascota.duenio;
        tipo.value=mascota.tipo;
        indice.value=index;
        if(indice.value){
            console.log(indice.value)
            btnGuardar.innerHTML="Editar";
        }



          }

      }


      function clear(){
          tipo.value="";
          nombre.value="";
          duenio.value="";
      }

     
         
      function eliminar(index) {
        const urlEnvio = `${url}/${index}`;
        return async function clickEnEliminar() {
          try {
            const respuesta = await fetch(urlEnvio, {
              method: "DELETE",
            });
            if (respuesta.ok) {
              listarMascotas();
              resetModal();
            }
          } catch (error) {
            console.log({ error });
            $(".alert").show();
          }
        };
      }