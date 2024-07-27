// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
export function getDaysInMonth(year, month) {
  // 月を0-11に変換 (1月が0、12月が11)
  const adjustedMonth = month - 1;
  // 次の月の1日の前日の日付を作成し、その日を取得する
  const date = new Date(year, adjustedMonth + 1, 0);
  return date.getDate();
}

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
export function countWeekdaysBetween(startDate, endDate) {
  let count = 0;
  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // 日曜日は0、土曜日は6
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
export function getWeekday(dateString, locale) {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

// ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。ただし getMonth、setMonth は利用してはいけない。
export function getFirstDayOfLastMonth() {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() - 1; // 月を1つ減らすことで先月を求める

  // 1月の場合は、年を1つ減らして12月にする
  if (month < 0) {
    year -= 1;
    month = 11; // JavaScriptのDateオブジェクトでは月が0から始まるため、12月は11となる
  }

  // 先月の1日を表すDateオブジェクトを返す
  return new Date(year, month, 1);
}
