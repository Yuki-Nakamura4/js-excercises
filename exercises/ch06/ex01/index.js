// 分からなかったのでGPTに生成してもらいました

function newHashTable() {
  return {
    size: 0,
    entries: [],
    get(key) {
      const index = this._hash(key);
      const entry = this.entries[index];
      if (!entry) return undefined;

      // ハッシュ値が一致するエントリーを探す
      let current = entry;
      while (current) {
        if (current.key === key) return current.value;
        current = current.next;
      }
      return undefined;
    },
    put(key, value) {
      const index = this._hash(key);
      const entry = this.entries[index];

      if (!entry) {
        // ハッシュ値が空の場合、新しいエントリーを追加
        this.entries[index] = { key, value, next: null };
        this.size++;
        return;
      }

      // ハッシュ値が衝突した場合、リンクリストを辿って追加または更新
      let current = entry;
      while (current) {
        if (current.key === key) {
          // キーが既に存在する場合、値を更新
          current.value = value;
          return;
        }
        if (!current.next) {
          // リンクリストの末尾に新しいエントリーを追加
          current.next = { key, value, next: null };
          this.size++;
          return;
        }
        current = current.next;
      }
    },
    remove(key) {
      const index = this._hash(key);
      const entry = this.entries[index];
      if (!entry) return;

      // ハッシュ値が一致するエントリーを探す
      let current = entry;
      let prev = null;
      while (current) {
        if (current.key === key) {
          if (!prev) {
            // 先頭のエントリーを削除
            this.entries[index] = current.next;
          } else {
            // 中間または末尾のエントリーを削除
            prev.next = current.next;
          }
          this.size--;
          return;
        }
        prev = current;
        current = current.next;
      }
    },
    _hash(key) {
      // 単純なハッシュ関数: 文字列の Unicode コードポイントの合計を返す
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
      }
      // 配列のサイズに合わせるためにモジュロ演算を使用
      return hash % this.entries.length;
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

sample();
