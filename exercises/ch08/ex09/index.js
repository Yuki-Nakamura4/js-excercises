export function withResource(resource, callback) {
  try {
    callback(resource);
  } finally {
    resource.close();
  }
}
