
let contador = 0;
let tareas = [];

const dataLocal = localStorage.getItem("tareas");

if (dataLocal) {
    tareas = JSON.parse(dataLocal);
}
const contadorLocalStorage = localStorage.getItem('contador');
console.log(contadorLocalStorage);

console.log(tareas);

if (contadorLocalStorage) {
    contadorTareas = parseInt(contadorLocalStorage);
}

function addTasks(nombreTarea, fechaTarea, completoTarea) {
    const miTarea = {
        id: contador,
        nombre: nombreTarea,
        completo: completoTarea,
        fecha: fechaTarea,
    };

    tareas.push(miTarea);.
    contador++;
    console.log(contador);
    localStorage.setItem('contador', contador);
    appendTaskDOM(miTarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    console.log(tareas);
}



function taskStatus(id, complete) {
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            tareas[i].completo = complete;
            console.log(tareas[i]);
            break;
        }
    }
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function deleteTask(id) {
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            tareas.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('tareas', JSON.stringify(tareas));
}


const lista = document.getElementById("task-list");

function appendTaskDOM(tarea) {
    const item = document.createElement("li");
    item.className = "task-list__item";

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `tarea-${tarea.id}`);

    const label = document.createElement("label");
    label.setAttribute("for", `tarea-${tarea.id}`);
    label.innerHTML = `${tarea.nombre} - ${tarea.fecha}`;
    checkbox.checked = tarea.completo;

 
    const buttonDelete = document.createElement("button");
    buttonDelete.className = "task-list__delete";
    buttonDelete.setAttribute("id", `delete-${tarea.id}`);
    buttonDelete.innerHTML = "Borrar";
  
    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(buttonDelete);
    lista.appendChild(item);

    checkbox.addEventListener("click", (event) => {
        const complete = event.currentTarget.checked;
        const itemId = event.currentTarget.getAttribute('id');
        const taskId = parseInt(itemId.substring(6));
        taskStatus(taskId, complete);
    });
    buttonDelete.addEventListener("click", (event) => {
        const itemId = event.currentTarget.getAttribute('id');
        const taskId = parseInt(itemId.substring(7));
        deleteTask(taskId);
        event.currentTarget.parentNode.remove();
    });
}

for (let i = 0; i < tareas.length; i++) {
    appendTaskDOM(tareas[i]);
}

const formulario = document.getElementById("new-task-form");

formulario.addEventListener("submit", (event) => {

    event.preventDefault();

    const tarea = addTasks(
        formulario.elements[0].value,
        formulario.elements[1].value,
        false
    );

    formulario.elements[0].value = "";
    formulario.elements[1].value = "";
});
