const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // フォームのデフォルトの送信処理はページをリロード(現在のURLに対してフォームの内容を送信)してしまうため
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";

  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // toggle が変化 (change) した際に label.style.textDecorationLine を変更する
  toggle.type = "checkbox";
  toggle.addEventListener("change", () => {
    // toggleがチェックされたらline-through(取り消し戦)、チェックが外れたらnone
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
  });

  const destroy = document.createElement("button");
  // destroy がクリック (click) された場合に elem を削除する
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    list.removeChild(elem);
  });

  // elem 内に toggle, label, destroy を追加する
  const div = document.createElement("div");
  // toggle, label, destroyを1つにまとめる。これが1つのタスクになる
  div.appendChild(toggle);
  div.appendChild(label);
  div.appendChild(destroy);

  // divをelem(リスト)に追加する。
  elem.appendChild(div);

  list.prepend(elem); // 上側にタスクを追加していくのでprepend
});
