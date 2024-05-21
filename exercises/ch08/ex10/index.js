export function addMyCall(f) {
  f.myCall = function (context, ...args) {
    return f.bind(context)(...args);
  };
  return f;
}
