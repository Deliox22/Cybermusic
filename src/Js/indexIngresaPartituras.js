 
import { onGetTasks2,saveTask2,deleteTask2,getTask2} from "./firebase.js";

var file = ""
var type_file = ""

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
 
    onGetTasks2((querySnapshot) => {
      tasksContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        var type = `${task.type}`;
        var traza = "";
        var traza2 = "";
        traza += `
        <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${task.title}</h3>
        <p>${task.description}</p>
        <p>${task.genre}</p>
        <p>${task.partText}</p>`;

        if (type == 'image/jpeg') { traza += `<img src="${task.downloadURL}" height="80" width="80"/>`;}
        if (type == 'image/png') { traza += `<img src="${task.downloadURL}" height="80" width="80"/>`;}
        if (type == 'audio/mpeg') { traza += `<audio controls height="80" width="80" src="${task.downloadURL}"/>`;}
        if (type == 'video/mp4') { traza += `<video controls><source type="video/webm" src="${task.downloadURL}"/>
        <source type="video/mp4" height="80" width="80" src="${task.downloadURL}"/></video>`;}
        
        traza += `</div>`;

        traza2 += `<div>;
        <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          Delete
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
          Edit 
        </button>`;

        traza2 += `</div>`;
       
        tasksContainer.innerHTML += traza += traza2;
      });

      const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask2(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask2(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;
          taskForm["task-genre"].value = task.genre;
          taskForm["task-partText"].value = task.partText;
          taskForm["task-file"].value = task.file;
          taskForm["task-type"].value = task.type;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });

    });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskForm["task-title"].value;
  const description = taskForm["task-description"].value;
  const genre = taskForm["task-genre"].value;
  const partText = taskForm["task-partText"].value;
  saveTask2(title, description, genre, partText,file, type_file);
  taskForm.reset();
});

document.getElementById("file_to_load").addEventListener("change", async (e) => {
  file = e.target.files[0]
  type_file = file['type']
});
