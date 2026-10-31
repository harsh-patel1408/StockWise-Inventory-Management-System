function normaliseSearch(value) {
  return typeof value === 'string' ? value.trim().slice(0, 80) : '';
}
function validId(value) {
  const n = Number(value);
  return Number.isSafeInteger(n) && n > 0 ? n : null;
}
module.exports = { normaliseSearch, validId };
