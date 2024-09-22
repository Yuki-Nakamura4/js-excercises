/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", function () {
  // 1. nav 要素内のリンク (<a>)
  const navLinks = document.querySelectorAll("nav a");
  console.log("nav 要素内のリンク:", navLinks);

  // 2. 商品リスト (.product-list) 内の最初の商品 (.product-item)
  const firstProductItem = document.querySelector(
    ".product-list .product-item:first-child" // :first-childをつけると最初の子要素を取得できる
  );
  console.log("商品リスト内の最初の商品:", firstProductItem);

  // 3. カートアイコンの画像 (<img>)
  const cartIconImg = document.querySelector(".cart img");
  console.log("カートアイコンの画像:", cartIconImg);

  // 4. 商品リスト (.product-list) 内の価格 (.price) を表示する要素
  const priceElements = document.querySelectorAll(".product-list .price");
  console.log("商品リスト内の価格を表示する要素:", priceElements);

  // 5. 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
  const productImages = document.querySelectorAll(
    ".product-list .product-item img"
  );
  console.log("商品リスト内の全ての商品画像:", productImages);

  // 6. 検索バー (.search-bar) 内の検索ボタン (<button>)
  const searchButton = document.querySelector(".search-bar button");
  console.log("検索バー内の検索ボタン:", searchButton);

  // 7. フッター (footer) 内のパラグラフ (<p>) 要素
  const footerParagraphs = document.querySelectorAll("footer p");
  console.log("フッター内のパラグラフ要素:", footerParagraphs);

  // 8. 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
  const evenProductItems = document.querySelectorAll(
    ".product-list .product-item:nth-child(even)" // :nth-child(even)をつけると偶数番目の子要素を取得できる
  );
  console.log("商品リスト内の偶数番目の商品:", evenProductItems);

  // 9. ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
  const accountImg = document.querySelector("header .account img");
  console.log("ヘッダー内のアカウントリンクの画像:", accountImg);

  // 10. ナビゲーションリンクのうち、"会社情報" のリンク
  const companyInfoLink = Array.from(document.querySelectorAll("nav a")).find(
    (link) => link.textContent.includes("会社情報") // .textContent.include()で特定の文字列が含まれているかを確認できる
  );
  console.log(
    "ナビゲーションリンクのうち、'会社情報' のリンク:",
    companyInfoLink
  );
});
