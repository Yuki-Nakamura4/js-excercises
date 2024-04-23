export function escapeStringWithIfElse(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (char === "\\") {
      result += "\\\\";
    } else if (char === '"') {
      result += '\\"';
    } else if (char === "\b") {
      result += "\\b";
    } else if (char === "\f") {
      result += "\\f";
    } else if (char === "\n") {
      result += "\\n";
    } else if (char === "\r") {
      result += "\\r";
    } else if (char === "\t") {
      result += "\\t";
    } else {
      result += char;
    }
  }
  return result;
}

export function escapeStringWithSwitch(input) {
  let result = "";
  for (let i = 0; i < input.length; i++) {
    let char = input.charAt(i);
    switch (char) {
      case "\\":
        result += "\\\\";
        break;
      case '"':
        result += '\\"';
        break;
      case "\b":
        result += "\\b";
        break;
      case "\f":
        result += "\\f";
        break;
      case "\n":
        result += "\\n";
        break;
      case "\r":
        result += "\\r";
        break;
      case "\t":
        result += "\\t";
        break;
      default:
        result += char;
        break;
    }
  }
  return result;
}
