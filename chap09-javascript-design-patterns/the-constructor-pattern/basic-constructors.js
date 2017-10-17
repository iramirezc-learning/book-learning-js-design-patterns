//- A Car Class Constructor

function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;

  // this method should go in the prototype
  // because every instance will have a copy of this function
  // wasting resources redefining each toString function.
  // in the prototype, there will be only one definition of this function
  // and will be shared among all the Car instances.
  // see constructors with prototypes.js
  this.toString = function () {
    return this.model + ' has done ' + this.miles + ' miles';
  };
}

//- Usage
var civic = new Car('Honda Civic', 2017, 5000);
var peugeot = new Car('Peugeot 208', 2018, 3000);

console.log(civic.toString()); // 'Honda Civic has done 5000 miles'.
console.log(peugeot.toString()); // 'Peugeot 208 has done 3000 miles'.

