export function getURLSearchParams(str) {
  return Object.fromEntries(new URLSearchParams(str));
}
