/**
 * Car Class Constructor
 * @param {string} model
 * @param {number} year
 * @param {number} miles
 */
function Car (model, year, miles) {
  this.model = model
  this.year = year
  this.miles = miles
}

// A single instance of 'toString' will be shared among all Car instances
Car.prototype.toString = function toString () {
  return this.model + ' has done ' + this.miles + ' miles'
}

module.exports = Car
