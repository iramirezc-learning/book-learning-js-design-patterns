const Calculator = {
  sum () {
    let total = 0;
    [].slice.call(arguments).forEach(n => { total += n })
    return total
  },
  multiply () {
    let total = 1;
    [].slice.call(arguments).forEach(n => { total *= n })
    return total
  },
  divide (dividen, divisor) {
    return dividen / divisor
  },
  execute: function (command) {
    return Calculator[command] && Calculator[command].apply(Calculator, [].slice.call(arguments, 1))
  }
}

module.exports = Calculator
