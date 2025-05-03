const API_URL = "http://localhost:3000/tasks";

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(tasks => {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = "";
      tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
      });
    });
}

function createTaskElement(task) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.className = "task-text";
  span.contentEditable = true;
  span.innerText = task.text;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const updateBtn = document.createElement("button");
  updateBtn.textContent = "Update";
  updateBtn.onclick = () => updateTask(task.id, span.innerText);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deleteTask(task.id);

  actions.appendChild(updateBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  return li;
}

function addTask() {
  const input = document.getElementById("newTaskInput");
  const text = input.value.trim();
  if (!text) return;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })
  .then(res => res.json())
  .then(newTask => {
    const taskList = document.getElementById("taskList");
    taskList.appendChild(createTaskElement(newTask));
    input.value = "";
  });
}

function updateTask(id, newText) {
  fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: newText })
  });
}

function deleteTask(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  }).then(loadTasks);
}
