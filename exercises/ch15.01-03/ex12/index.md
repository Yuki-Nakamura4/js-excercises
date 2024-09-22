## ページ内のリンクを一覧表示するブックマークレット

```javascript
javascript: (function () {
  const links = document.getElementsByTagName("a");
  let list = "<ul>";
  for (const i = 0; i < links.length; i++) {
    list +=
      "<li>" +
      links[i].innerText +
      ': <a href="' +
      links[i].href +
      '" target="_blank">' +
      links[i].href +
      "</a></li>";
  }
  list += "</ul>";
  const newWindow = window.open();
  newWindow.document.write(
    "<html><body><h1>リンク一覧</h1>" + list + "</body></html>"
  );
  newWindow.document.close();
})();
```
