export function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

const maliciousInput = 'console.log("dangerous code!")';

f(maliciousInput);
