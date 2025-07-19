let form = document.getElementById("task-form");
let input = document.getElementById("task-bar");
let list = document.getElementById("list-item");

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 


function renderTasks() {
  list.innerHTML = ""; 
  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    let taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;
    taskSpan.style.margin = "0 10px";
    taskSpan.style.textDecoration = task.done ? "line-through" : "none";

    let editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.style.marginLeft = "10px";
    editBtn.addEventListener("click", () => {
      let newText = prompt("Edit your task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "5px";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, done: false });
  saveTasks();
  renderTasks();
  input.value = "";
});

renderTasks();
