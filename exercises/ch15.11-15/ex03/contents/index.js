const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // GETはシンプルリクエストなのでCORSの設定は不要
  const response = await fetch("http://localhost:3001/api/tasks");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  const tasks = data.items;

  for (const task of tasks) {
    appendToDoItem(task);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  input.value = "";

  const response = await fetch("http://localhost:3001/api/tasks", {
    method: "POST",
    mode: "cors", // CORSモードを指定
    credentials: "include", // Cookieを送信する
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: todo }),
  });

  if (!response.ok) {
    alert("Failed to create a new task");
    return;
  }

  const task = await response.json();
  appendToDoItem(task);
});

function appendToDoItem(task) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";
  label.style.textDecorationLine = task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  toggle.addEventListener("change", async () => {
    const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
      method: "PATCH",
      mode: "cors", // CORSモードを指定
      credentials: "include", // Cookieを送信する
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: toggle.checked ? "completed" : "active" }),
    });
    if (!response.ok) {
      alert("Failed to update the task");
      return;
    }
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
  }
  );

  const destroy = document.createElement("button");
  destroy.textContent = "delete";

  destroy.addEventListener("click", async () => {
    const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
      method: "DELETE",
      mode: "cors", // CORSモードを指定
      credentials: "include", // Cookieを送信する
    });

    if (!response.ok) {
      alert("Failed to delete the task");
      return;
    }
    elem.remove();
  });

  elem.append(toggle, label, destroy);
  list.prepend(elem);
  console.log(document.cookie);

}
