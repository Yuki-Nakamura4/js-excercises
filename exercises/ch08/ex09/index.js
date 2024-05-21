export function withResource(resource, callback) {
  try {
    callback(resource);
  } finally {
    if (resource && typeof resource.close === "function") {
      resource.close();
    }
  }
}
