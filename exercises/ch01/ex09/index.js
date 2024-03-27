class DefaultMap extends Map {
    constructor(defaultValue) {
        super();
        this.defaultValue = defaultValue;
    }

    get(key) {
        if (this.has(key)) {
            return super.get(key);
        } else {
            return this.defaultValue;
        }
    }
}

class WordHistogram {
    constructor() {
        this.wordCounts = new DefaultMap(0); // 単語と出現回数をマップする。
        this.totalWords = 0; // 全体の単語数
    }

    // テキスト中の単語でヒストグラムを更新する
    add(text) {
        const matches = text.toLowerCase().matchAll(/\w+|\$[\d.]+|\S+/g);
        const words = [...matches].map((r) => r[0]);

        for (let word of words) {
            let count = this.wordCounts.get(word);
            this.wordCounts.set(word, count + 1);
            this.totalWords++;
        }
    }

    // ヒストグラムを文字列に変換して、ASCIIグラフィックとして表示する
    toString() {
        let entries = [...this.wordCounts];

        // 単語数順にソートする。出現回数が同じ場合は、アルファベット順でソートする。
        entries.sort((a, b) => {
            if (a[1] === b[1]) {
                return a[0] < b[0] ? -1 : 1;
            } else {
                return b[1] - a[1];
            }
        });

        // 出現頻度をパーセントに変換する。
        for (let entry of entries) {
            entry[1] = entry[1] / this.totalWords * 100;
        }

        // 出現頻度 0.5% 以上を取得
        entries = entries.filter((entry) => entry[1] >= 0.5);

        // 各項目を1行のテキストに変換する。
        const lines = entries.map(
            ([w, n]) =>
                `${w.padStart(10)}: ${"#".repeat(Math.round(10 * n))} ${n.toFixed(2)}%`
        );

        // 各行を改行文字で区切って結合し、結合した文字列を返す。
        return lines.join("\n");
    }
}

async function histogramFromStdin() {
    process.stdin.setEncoding("utf-8");
    let histogram = new WordHistogram();
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }
    return histogram;
}

histogramFromStdin().then(histogram => { console.log(histogram.toString()) });
