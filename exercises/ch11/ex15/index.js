export function modifyUrl({ base, addQuery = [], path }) {
  try {
    const url = new URL(base);

    if (path) {
      url.pathname = path;
    }

    addQuery.forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    return url.toString();
  } catch (e) {
    throw new Error("Invalid URL format");
  }
}
