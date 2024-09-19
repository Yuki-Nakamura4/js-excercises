document.getElementById("loadModule").addEventListener("click", async () => {
  const module = await import("http://localhost:8081/module.js");
  module.sayHello();
});
