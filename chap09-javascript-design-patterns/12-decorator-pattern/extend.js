module.exports = function (a, b) {
  for (let prop in b) {
    if (Object.hasOwnProperty.call(b, prop)) {
      a[prop] = b[prop]
    }
  }

  return a
}