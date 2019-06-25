
module.exports = function parseDate(date=new Date()) {
  const d = new Date(+date || date);
  const p = Date.parse(d);
  if(isNaN(p) || d === 'Invalid Date') return {error: "Invalid Date"}
  return {
    unix: p,
    utc: d.toUTCString()
  }
}