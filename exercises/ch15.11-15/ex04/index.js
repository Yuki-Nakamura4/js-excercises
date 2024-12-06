document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#new-todo-form");
  const list = document.querySelector("#todo-list");
  const input = document.querySelector("#new-todo");

  // ToDoリストをlocalStorageから読み込む
  const loadTodos = () => {
    try {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      todos.forEach(todo => appendToDoItem(todo));
    } catch (e) {
      console.error("Failed to load todos from localStorage", e);
    }
  };

  // ToDoリストをlocalStorageに保存する
  const saveTodos = () => {
    try {
      const todos = []; // 毎回画面上の全アイテムを取得し保存する
      list.querySelectorAll("li").forEach(li => {
        // UI上の情報からアイテムを取得
        // 指摘：DOM操作は関数の外でするとテストしやすくなる(純粋関数にする)
        const label = li.querySelector("label");
        const toggle = li.querySelector("input[type='checkbox']");
        todos.push({ name: label.textContent, completed: toggle.checked });
      });
      // JSON文字列に変換して保存
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (e) {
      console.error("Failed to save todos to localStorage", e);
    }
  };

  // ToDoアイテムを追加する関数
  const appendToDoItem = (todo) => {
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = todo.name;
    label.style.textDecorationLine = todo.completed ? "line-through" : "none";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = todo.completed;
    toggle.addEventListener("change", () => {
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
      saveTodos();
    });

    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => {
      list.removeChild(elem);
      saveTodos();
    });

    const div = document.createElement("div");
    div.appendChild(toggle);
    div.appendChild(label);
    div.appendChild(destroy);

    elem.appendChild(div);
    list.prepend(elem);
  };

  // フォームの送信イベントを処理
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value.trim() === "") {
      return;
    }
    const todo = { name: input.value.trim(), completed: false };
    input.value = "";

    appendToDoItem(todo);
    saveTodos();
  });

  // localStorageからToDoリストを読み込む
  loadTodos();

  // 他のタブでの変更を監視
  window.addEventListener("storage", (e) => {
    if (e.key === "todos") {
      list.innerHTML = ""; // 一旦リストをクリアし、重複を防ぐ
      loadTodos();
    }
  });
});