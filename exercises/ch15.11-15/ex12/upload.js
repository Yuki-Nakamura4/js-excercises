document.getElementById("uploadButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const accessToken = document.getElementById("accessToken").value;

  if (fileInput.files.length === 0) {
    alert("ファイルを選択してください。");
    return;
  }

  if (!accessToken) {
    alert("アクセストークンを入力してください。");
    return;
  }

  const file = fileInput.files[0];
  const fileName = file.name;

  try {
    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${fileName}:/content`;
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`, // アクセストークンをヘッダーに追加
        "Content-Type": file.type, // ファイルのMIMEタイプを指定
      },
      body: file,
    });

    if (response.ok) {
      alert("ファイルが正常にアップロードされました。");
    } else {
      const errorData = await response.json();
      alert(`アップロードに失敗しました: ${errorData.error.message}`);
    }
  } catch (error) {
    alert(`エラーが発生しました: ${error.message}`);
  }
});
