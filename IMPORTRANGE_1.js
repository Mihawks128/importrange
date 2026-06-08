document.getElementById('importForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // エラーメッセージをクリア
  document.getElementById('urlError').textContent = '';
  document.getElementById('sheetError').textContent = '';
  document.getElementById('startCellError').textContent = '';
  document.getElementById('endCellError').textContent = '';

  // ユーザーの入力を取得
  const url = document.getElementById('url').value;
  const sheet = document.getElementById('sheet').value;
  const startCell = document.getElementById('startCell').value;
  const endCell = document.getElementById('endCell').value;

  // バリデーション
  let isValid = true;

  // URLの形式が正しいかチェック
  const urlPattern = /^(https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9_-]+\/)/;
  if (!urlPattern.test(url)) {
    document.getElementById('urlError').textContent = '正しいGoogleスプレッドシートのURLを入力してください。';
    isValid = false;
  }

  // セル範囲が正しいかチェック（簡単な形式チェック）
  const cellPattern = /^[A-Za-z]+\d+$/;
  if (!cellPattern.test(startCell) || !cellPattern.test(endCell)) {
    document.getElementById('startCellError').textContent = '開始セルと終了セルは正しい形式で入力してください（例: A1, D10）。';
    isValid = false;
  }

  if (isValid) {
    // 数式を生成
    const formula = `=IMPORTRANGE("${url}", "${sheet}!${startCell}:${endCell}")`;
    document.getElementById('formulaOutput').textContent = formula;
  }
});
