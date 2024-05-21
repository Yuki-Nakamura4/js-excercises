export function any(...funcs) {
  return function (...args) {
    for (const func of funcs) {
      if (func(...args)) {
        return true;
      }
    }
    return false;
  };
}

export function catching(func, errorHandler) {
  return function (...args) {
    try {
      return func(...args);
    } catch (error) {
      return errorHandler(error);
    }
  };
}
