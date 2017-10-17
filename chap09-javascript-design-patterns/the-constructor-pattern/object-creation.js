//- Ways to create an object

var newObject1 = {};

var newObject2 = Object.create(Object.prototype);

var newObject3 = new Object();

//- Key Values (Ways to assign and get values)

// 1. Dot sintax

newObject1.someKey = 'Hello World 1';

console.log(newObject1.someKey); // 'Hello World 1'

// 2. Square brackets sintax

newObject2['someKey'] = 'Hello World 2';

console.log(newObject2['someKey']); // 'Hello World 2'

// 3. Object.defineProperty

Object.defineProperty(newObject3, 'someKey', {
  value: 'Hello World 3',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log(newObject3.someKey); // 'Hello World 3'

// 4. Object.defineProperties

var newObject4 = Object.create({});

Object.defineProperties(newObject4, {
  'someKey': {
    value: 'Hello World 4',
    writable: true,
    enumerable: true,
    configurable: true,
  },
});

console.log(newObject4.someKey); // 'Hello World 4'

// 5. While creating and object with Object.create

var newObject5 = Object.create({}, {
  someKey: {
    value: 'Hello World 5',
    writable: true,
    enumerable: true,
    configurable: true,
  },
});

console.log(newObject5.someKey); // 'Hello World 5'


//- See prototypes
var newObject6 = Object.create(Object); // this is odd
var newObject7 = Object.create(new Object); // same as {}

console.log('Object1 prototype->', Object.getPrototypeOf(newObject1), typeof Object.getPrototypeOf(newObject1)); // {} object
console.log('Object2 prototype->', Object.getPrototypeOf(newObject2), typeof Object.getPrototypeOf(newObject2)); // {} object
console.log('Object3 prototype->', Object.getPrototypeOf(newObject3), typeof Object.getPrototypeOf(newObject3)); // {} object
console.log('Object4 prototype->', Object.getPrototypeOf(newObject4), typeof Object.getPrototypeOf(newObject4)); // {} object
console.log('Object5 prototype->', Object.getPrototypeOf(newObject5), typeof Object.getPrototypeOf(newObject5)); // {} object
console.log('Object6 prototype->', Object.getPrototypeOf(newObject6), typeof Object.getPrototypeOf(newObject6)); // function Object function
console.log('Object7 prototype->', Object.getPrototypeOf(newObject7), typeof Object.getPrototypeOf(newObject7)); // {} object


//- Helper function to add properties

function defineProp(obj, key, value) {
  var config = {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true,
  };
  Object.defineProperty(obj, key, config);
}

var person = Object.create(Object.prototype);

defineProp(person, 'name', 'Isaac');
defineProp(person, 'age', 30);

console.log('person->', person); // {name: 'Isaac', age: 30}

//- Inheritance

var driver = Object.create(person);

defineProp(driver, 'topSpeed', '100mph');

console.log('driver->', driver); // {topSpeed: '100mph'}
// by inheritance both stay the same
console.log('person.name->', person.name); // 'Isaac'
console.log('drive.name->', driver.name); // 'Isaac'

// change person's name
person.name = 'Robert';
// driver is still pulling from the persons name until it has its own
console.log('person.name->', person.name); // 'Robert'
console.log('driver.name->', driver.name); // 'Robert'

// change driver's name
driver.name = 'Nahum';
// now driver has its own name
console.log('person.name->', person.name); // 'Robert'
console.log('driver.name->', driver.name); // 'Nahum'

// change one more time person's name
person.name = 'Saun';
// changing again the person's name won't affect driver's name
console.log('person.name->', person.name); // 'Saun'
console.log('driver.name->', driver.name); // 'Robert'



