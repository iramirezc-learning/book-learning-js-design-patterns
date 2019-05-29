/**
 * A Car Class Constructor
 * @param {string} model
 * @param {number} year
 * @param {number} miles
 */
function Car (model, year, miles) {
  this.model = model
  this.year = year
  this.miles = miles

  // This method should go in the prototype
  // because every instance will have a copy of this function
  // wasting resources redefining each toString function.
  // In the prototype, there will be only one definition of this function
  // and will be shared among all the Car instances.
  // See constructors with prototypes.js
  this.toString = function () {
    return this.model + ' has done ' + this.miles + ' miles'
  }
}

module.exports = Car
