export function modifyUrl({ base, addQuery = [], path }) {
  try {
    const url = new URL(base);

    if (path) {
      if (path.startsWith("./")) {
        // 相対パスの場合
        url.pathname =
          url.pathname.replace(/\/[^/]*$/, "/") + path.substring(2);
      } else {
        // 絶対パスの場合
        url.pathname = path;
      }
    }

    addQuery.forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    return url.toString();
  } catch (e) {
    throw new Error("Invalid URL format");
  }
}
