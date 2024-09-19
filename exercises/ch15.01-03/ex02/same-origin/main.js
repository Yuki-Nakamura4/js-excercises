document.getElementById("loadModule").addEventListener("click", async () => {
  const module = await import("./module.js");
  module.sayHello();
});
