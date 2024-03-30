export function convertLFtoCRLF(str) {
  // LF -> CR+LF
  str = str.replace(/\n/g, "\r\n");
  return str;
}

export function convertCRLFtoLF(str) {
  // CR+LF -> LF
  str = str.replace(/\r\n/g, "\n");
  return str;
}
