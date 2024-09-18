## 問題2

index.html ファイル内の script タグから `type="module"` 属性を削除した場合、期待通り動作させるにはどうすべきか

### 回答

index.htmlファイル内に直接JavaScriptコードを埋めこむ。
以下のようにscriptタグの中にJavaScriptを直接記述できる。

```html
<!doctype html>
<html lang="ja">
  <head>
    <title>Simple ToDo</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
  </head>
  <body>
    <form id="new-todo-form">
      <input type="text" id="new-todo" placeholder="What needs to be done?" />
      <button type="submit">Add</button>
    </form>
    <ul id="todo-list"></ul>
    <script>
      const form = document.querySelector("#new-todo-form");
      const list = document.querySelector("#todo-list");
      const input = document.querySelector("#new-todo");

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (input.value.trim() === "") {
          return;
        }
        const todo = input.value.trim();
        input.value = "";

        const elem = document.createElement("li");

        const label = document.createElement("label");
        label.textContent = todo;
        label.style.textDecorationLine = "none";

        const toggle = document.createElement("input");
        toggle.type = "checkbox";
        toggle.addEventListener("change", () => {
          label.style.textDecorationLine = toggle.checked
            ? "line-through"
            : "none";
        });

        const destroy = document.createElement("button");
        destroy.textContent = "❌";
        destroy.addEventListener("click", () => {
          list.removeChild(elem);
        });

        const div = document.createElement("div");
        div.appendChild(toggle);
        div.appendChild(label);
        div.appendChild(destroy);

        elem.appendChild(div);

        list.prepend(elem);
      });
    </script>
  </body>
</html>
```
