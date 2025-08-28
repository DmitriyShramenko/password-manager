export function generatePassword({ length = 12, useLower = true, useUpper = true, useDigits = true, useSymbols = false } = {}) {
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'
  const symbols = '!@#$%^&*'
  let chars = ''
  if (useLower) chars += lower
  if (useUpper) chars += upper
  if (useDigits) chars += digits
  if (useSymbols) chars += symbols
  if (!chars) chars = lower
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}