function StartPopup({ onStart }: { onStart: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center text-white bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-black p-8 rounded-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-8 text-center">なんてことだ！</h2>
        <div className="space-y-4">
          <p>
            あなたはタイムマシンの開発をしていましたが、
            <br />
            ある日タイムマシンが誤動作を起こし、
            <br />
            意図せず未来に来てしまいました。
            <br />
          </p>
          <p>
            元の時代に帰るためには、
            <br />
            <span className="text-blue-400">この時代の正確な時刻</span>
            を知る必要があります。
            <br />
            しかし、辺りは一面砂しかなく、
            <br />
            建物も人間もまるで見当たりません。
            <br />
          </p>
          <p>
            果たして、あなたは元の時代に
            <br />
            帰れるのでしょうか......。
          </p>
        </div>
        <div className="pt-8 flex justify-center">
          <button
            onClick={onStart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            スタート
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartPopup;
