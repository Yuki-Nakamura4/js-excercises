// 別タブに変更を反映させるのを実装漏れしている。。

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.querySelector("#new-todo-form");
  const list = document.querySelector("#todo-list");
  const input = document.querySelector("#new-todo");

  // ToDoリストをIndexedDBから読み込む
  const loadTodos = async () => {
    try {
      const todos = await getTodosFromDB();
      todos.forEach(todo => appendToDoItem(todo));
    } catch (e) {
      console.error("Failed to load todos from IndexedDB", e);
    }
  };

  // ToDoアイテムを追加する関数
  const appendToDoItem = (todo) => {
    const elem = document.createElement("li");
    elem.dataset.id = todo.id;

    const label = document.createElement("label");
    label.textContent = todo.name;
    label.style.textDecorationLine = todo.completed ? "line-through" : "none";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = todo.completed;
    toggle.addEventListener("change", async () => {
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
      todo.completed = toggle.checked;
      await updateTodoInDB(todo);
    });

    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", async () => {
      list.removeChild(elem);
      await deleteTodoFromDB(todo.id);
    });

    const div = document.createElement("div");
    div.appendChild(toggle);
    div.appendChild(label);
    div.appendChild(destroy);

    elem.appendChild(div);
    list.prepend(elem);
  };

  // フォームの送信イベントを処理
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (input.value.trim() === "") {
      return;
    }
    const todo = { name: input.value.trim(), completed: false };
    input.value = "";

    const id = await addTodoToDB(todo);
    todo.id = id;
    appendToDoItem(todo);
  });

  // IndexedDBからToDoリストを読み込む
  await loadTodos();

  // 他のタブでの変更を監視
  window.addEventListener("storage", async (e) => {
    if (e.key === "todos") {
      list.innerHTML = "";
      await loadTodos();
    }
  });
});


// IndexedDBの操作

const dbName = "todoDB"; // データベース名
const storeName = "todos"; // オブジェクトストア名

// データベースを開く関数
const openDB = () => {
  // IndexedDBは非同期でデータベースを操作する
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1); // 第二引数はデータベースのバージョン

    // データベースが存在しない場合に open 操作でデータベースが作成されるとonupgradeneededイベントが発生し、
    // そのイベントハンドラーでデータベースのスキーマを作成することができる
    // また、バージョンが更新された場合にも onupgradeneeded イベントが発生する
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // このデータベース用のオブジェクトストアを作成
      // IndexedDBはテーブルではなくオブジェクトストアを使用しており、ひとつのデータベースに複数保持できる
      db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true }); // 自動採番を有効化
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// IndexedDBにデータを追加する関数
const addTodoToDB = async (todo) => {
  const db = await openDB(); // データベースを開く
  return new Promise((resolve, reject) => {
    // トランザクションを開始。読み書きの両方を許可
    const transaction = db.transaction(storeName, "readwrite");
    // オブジェクトストアを取得
    const store = transaction.objectStore(storeName);
    // データを追加
    const request = store.add(todo);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const getTodosFromDB = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const updateTodoInDB = async (todo) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(todo);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const deleteTodoFromDB = async (id) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};