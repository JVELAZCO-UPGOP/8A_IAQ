const listaMascotas = document.getElementById('lista-mascotas');
const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('duenio');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar=document.getElementById('save');
const create= document.getElementById('crear');
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
    {
        tipo: "Gato",
        nombre: "Felicia",
        duenio:"Neo"
    },

    {
        tipo: "Gato",
        nombre: "Nairobi",
        duenio:"Neo"
    }

    ];

function listarMascotas() {
    console.log('Dentro de listar');
    solicitarmascotas();

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
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));

  }


function enviarDatos(evento) {
    
    evento.preventDefault();

    const data = {
        tipo: tipo.value,
        nombre: nombre.value,
        duenio: dueno.value
        
        };

        const acc= btnGuardar.innerHTML;
        alert( acc)
        switch(acc){
            case 'Editar':
                mascotas[indice.value]=data;
                alert("Se ha modificado correctamente");

            break;
            default:
                mascotas.push(data);
                alert("Se ha creado correctamente");
                break;

        }

      
        listarMascotas();
      }
      form.onsubmit= enviarDatos;
      listarMascotas();

   function solicitarmascotas(){
       console.log('Dentro de solicitar');
          fetch('http://localhost:5000/mascotas').then((respuesta)=>{
                if(respuesta.ok){
                    console.log(' dentro de respuesta');

                    return respuesta.json();


                }
          })
          .then(mascotasdelserver=>{
            console.log({mascotasdelserver})
          });
      }

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

      function eliminar(index){
          
          return function deletethis(){
            
            console.log(index);

            mascotas= mascotas.filter(((mascota,indicemascota)=>indicemascota!==index));
            listarMascotas();


          }
         
      }