//- Car Class Constructor 
function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}

//- A single instance of 'toString' will be shared among all Car instances
Car.prototype.toString = function toString() {
  return this.model + ' has done ' + this.miles + ' miles';
};

//- Usage
var civic = new Car('Honda Civic', 2017, 5000);
var peugeot = new Car('Peugeot 208', 2018, 3000);

console.log(civic.toString()); // 'Honda Civic has done 5000 miles'.
console.log(peugeot.toString()); // 'Peugeot 208 has done 3000 miles'.
