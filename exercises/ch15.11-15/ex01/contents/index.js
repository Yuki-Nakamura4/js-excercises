const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  const response = await fetch("http://localhost:3000/api/tasks");
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
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoElement で ToDo リストの要素として追加しなさい
  const response = await fetch("http://localhost:3000/api/tasks", {
    method: "POST",
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

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";
  label.style.textDecorationLine = task.status === "completed" ? "line-through" : "none"; // 初期状態を反映

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed"; // 初期状態を設定
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", async () => {
    const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
      method: "PATCH",
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
  destroy.textContent = "delete"; // ボタンにテキストを追加

  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", async () => {
    const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Failed to delete the task");
      return;
    }
    elem.remove();
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
  console.log(document.cookie);

}
