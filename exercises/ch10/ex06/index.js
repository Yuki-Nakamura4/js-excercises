console.log("Start of index.js");

import "./module1.js";

console.log("Middle of index.js");

import "./module2.js";
import "./module1.js";

console.log("End of index.js");
