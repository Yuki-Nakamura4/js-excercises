
export function newHashTable() {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries:[] // マッピングを格納する配列
    get(key) {
      // keyにマップされた値を取得する
    },
    put(key, value) {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
    },
    remove(key) {
      // keyのマッピングを削除する
    },
  };
}

function sample() {
  const hashTable = newHashTable();
  hashTable.put("key1", "value1");
  hashTable.put("key2", { value: "value2" });

  console.log(`size=${hashTable.size}`); // => size=2
  console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
  console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

  hashTable.put("key2", "new value");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

  hashTable.remove("key2");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
  console.log(`size=${hashTable.size}`); // => size=1
}