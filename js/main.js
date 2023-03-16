let alumnos = [];

let tablebody = document.getElementById("pbody");

if (localStorage.getItem("alumnos") != null){
  alumnos = JSON.parse(localStorage.getItem("alumnos"));
  for (i=0 ; i<alumnos.length ; i++){
    let tr = `<tr>
    <td>`+alumnos[i].id+`</td>
    <td>`+alumnos[i].nombre+`</td>
    <td>`+alumnos[i].apellido+`</td>
    <td>`+alumnos[i].dni+`</td>
    <td><i onclick="modalEditar(`+alumnos[i].id+`)" class="fa-solid fa-pen-to-square"></i><i onclick="funcionEliminar(`+alumnos[i].id+`)" class="fa-solid fa-trash m-2"></i></td>
    </tr>`;
    tablebody.innerHTML+=tr;
  }
}

function funcionAgregar(){
  let id = alumnos.length>0?(alumnos[alumnos.length-1].id+1):1;
  let nombre = $("#nombre").val();
  let apellido = $("#apellido").val();
  let dni = $("#dni").val();
  alumnos.push({
    id : id,
    nombre : nombre,
    apellido : apellido,
    dni : dni
  });
  localStorage.setItem("alumnos" , JSON.stringify(alumnos));
  rellenarTabla();
  cerrarModal();
}

function rellenarTabla(){
  alumnos = JSON.parse(localStorage.getItem("alumnos"));
  tablebody.innerHTML = "";
  for (i=0 ; i<alumnos.length ; i++){
    let tr = `<tr>
    <td>`+alumnos[i].id+`</td>
    <td>`+alumnos[i].nombre+`</td>
    <td>`+alumnos[i].apellido+`</td>
    <td>`+alumnos[i].dni+`</td>
    <td><i onclick="modalEditar(`+alumnos[i].id+`)" class="fa-solid fa-pen-to-square"></i> <i onclick="funcionEliminar(`+alumnos[i].id+`)" class="fa-solid fa-trash m-2"></i></td>
    </tr>`;
    tablebody.innerHTML+=tr;
  }
}

function cerrarModal(){
  let instanciaModal = document.querySelector("#exampleModal");
  let modal = bootstrap.Modal.getInstance(instanciaModal);
  modal.hide();
}

function funcionEditar(){
  let index = alumnos.findIndex(alumno => alumno.id == $("#id").val());
  alumnos[index].nombre = $("#nombre").val();
  alumnos[index].apellido = $("#apellido").val();
  alumnos[index].dni = $("#dni").val(); 
  localStorage.setItem("alumnos" , JSON.stringify(alumnos));
  rellenarTabla();
  cerrarModal();
}

function modalAgregar(){
  document.getElementById("exampleModalLabel").innerHTML = "Agregar alumno";
  $("#nombre").val("");
  $("#apellido").val("");
  $("#dni").val("");
  $("#botonEditar").hide();
  $("#botonAgregar").show();
}

function modalEditar(id){
  document.getElementById("exampleModalLabel").innerHTML = "Editar alumno";
  let index = alumnos.findIndex(alumno => alumno.id == id);
  let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('exampleModal'));
  modal.show();
  $("#id").val(id);
  $("#nombre").val(alumnos[index].nombre);
  $("#apellido").val(alumnos[index].apellido);
  $("#dni").val(alumnos[index].dni);
  $("#botonEditar").show();
  $("#botonAgregar").hide();
}

function funcionEliminar(id){
  let index = alumnos.findIndex(alumno => alumno.id == id);
  alumnos.splice(index,1);
  localStorage.setItem("alumnos" , JSON.stringify(alumnos));
  rellenarTabla();
}