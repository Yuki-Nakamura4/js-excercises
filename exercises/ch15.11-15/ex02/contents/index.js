const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

function retryWithExponentialBackoff(func, maxRetry, callback) {
  let attempt = 0;

  const tryFunc = async () => {
    try {
      const response = await func();
      if (response && response.status === 200) {
        console.log("success");
        console.log(response);
        callback(true, response);
      } else if (
        response &&
        response.status >= 500 &&
        response.status < 600 &&
        attempt < maxRetry
      ) {
        // 指数関数的バックオフでリトライ
        attempt++;
        const waitTime = Math.pow(2, attempt - 1);
        setTimeout(tryFunc, waitTime * 1000);
      } else {
        callback(false);
      }
    } catch (error) {
      callback(false, error);
    }
  };

  tryFunc();
}

function fetchWithTimeout(url, options = { timeout: 3000 }) {
  if (options.timeout) {
    const controller = new AbortController();
    options.signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, options.timeout);
  }

  return fetch(url, options);
}

function requestWithRetryAndTimeout(url, options = {}) {
  return new Promise((resolve, reject) => {
    options.timeout = 3000;
    retryWithExponentialBackoff(
      () => fetchWithTimeout(url, { ...options }),
      10,
      (success, response) => {
        if (success) {
          resolve(response);
        } else {
          reject(response);
        }
      }
    );
  }).catch((error) => {
    if (error.name === "AbortError") {
      alert("リクエストがタイムアウトしました");
    } else {
      alert(error.message);
    }
    throw error;
  });
}

function disableForm() {
  form.querySelector("button").disabled = true;
  input.disabled = true;
  list.querySelectorAll("button, input[type='checkbox']").forEach((elem) => {
    elem.disabled = true;
  });
}

function enableForm() {
  form.querySelector("button").disabled = false;
  input.disabled = false;
  list.querySelectorAll("button, input[type='checkbox']").forEach((elem) => {
    elem.disabled = false;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    disableForm();
    const response = await requestWithRetryAndTimeout(
      "http://localhost:3000/api/tasks"
    );
    if (!response || !response.ok) {
      alert("Failed to fetch tasks");
      return;
    }
    const data = await response.json();
    const tasks = data.items;

    for (const task of tasks) {
      appendToDoItem(task);
    }
  } catch (error) {
    console.error(error);
  } finally {
    enableForm();
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  input.value = "";

  try {
    disableForm();
    const response = await requestWithRetryAndTimeout(
      "http://localhost:3000/api/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: todo }),
      }
    );

    if (response && response.status === 201) {
      const task = await response.json();
      appendToDoItem(task);
    } else {
      alert("Failed to create a new task");
    }
  } catch (error) {
    console.error(error);
  } finally {
    enableForm();
  }
});

function appendToDoItem(task) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  toggle.addEventListener("change", async () => {
    try {
      disableForm();
      const response = await requestWithRetryAndTimeout(
        `http://localhost:3000/api/tasks/${task.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: toggle.checked ? "completed" : "active",
          }),
        }
      );
      if (response && response.status === 200) {
        label.style.textDecorationLine = toggle.checked
          ? "line-through"
          : "none";
      } else {
        alert("Failed to update the task");
      }
    } catch (error) {
      console.error(error);
    } finally {
      enableForm();
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "delete";

  destroy.addEventListener("click", async () => {
    try {
      disableForm();
      const response = await requestWithRetryAndTimeout(
        `http://localhost:3000/api/tasks/${task.id}`,
        {
          method: "DELETE",
        }
      );
      if (response && response.status === 204) {
        elem.remove();
      } else {
        alert("Failed to delete the task");
      }
    } catch (error) {
      console.error(error);
    } finally {
      enableForm();
    }
  });

  elem.append(toggle, label, destroy);
  list.prepend(elem);
  console.log(document.cookie);
}
