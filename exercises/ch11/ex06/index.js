export function isEmailAddress(email) {
  if (
    typeof email !== "string" || // 文字列でない場合は無効
    email.length > 254 || // 254文字を超える場合は無効
    email.length === 0 || // 空の場合は無効
    email.includes(",") || // カンマが含まれている場合は無効
    email.includes("..") || // 連続するドットがある場合は無効
    /[^a-zA-Z0-9!#$%&'*+-/=?^_`{|}~.@]/.test(email) // 許可されていない文字が含まれている場合は無効
  )
    return false;

  // ローカルパートとドメインパートに分割
  const parts = email.split("@");
  if (parts.length !== 2) return false; // @がない、または2つ以上ある場合は無効
  const [local, domain] = parts;

  // ローカルパートのチェック
  if (
    local.length > 64 || // 64文字を超える場合は無効
    local.length === 0 || // 空の場合は無効
    local.startsWith(".") || // ドットで始まる場合は無効
    local.endsWith(".") // ドットで終わる場合は無効
  )
    return false;

  // ドメインパートのチェック
  if (
    domain.length > 254 || // 254文字を超える場合は無効
    domain.length === 0 || // 空の場合は無効
    domain.startsWith(".") || // ドットで始まる場合は無効
    domain.endsWith(".") // ドットで終わる場合は無効
  )
    return false;

  return true;
}
