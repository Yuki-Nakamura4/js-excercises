// NFC形式
let strNFC = "\u30d1\u3093"; // パン

// NFD形式
let strNFD = "\u30d1\u3093"; // パン
strNFD = strNFD.normalize("NFD");
