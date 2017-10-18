//- Example of the Module Pattern using a IIFE
var testModule = (function () {
  var counter = 0;

  return {
    incrementCounter: function () {
      return counter++;
    },
    resetCounter: function () {
      console.log('Counter was: ' + counter);
      counter = 0;
    },
  };
})();

testModule.incrementCounter(); // increments to 1

console.log(testModule.incrementCounter()); //increments to 2, prints 1

testModule.resetCounter(); // 'Counter was: 2'

console.log(testModule.incrementCounter()); // 0

//- Example 2. Template
var myNamespace = (function () {
  // a private variable
  var myPrivateVar = 0;

  // private method
  var myPrivateMethod = function (foo) {
    console.log(foo);
  };

  return {
    // a public var
    myPublicVar: 'foo',
    // a public method using privates
    myPublicMethod: function (bar) {
      // increments private var
      myPrivateVar++;
      // calls private method
      myPrivateMethod(bar);
    },
  };
})();

console.log(myNamespace.myPublicVar); // 'foo'

myNamespace.myPublicMethod('Hello World'); // 'Hello World'

//- Another Example
var basketModule = (function () {
  // privates
  var basket = [];

  function doSomethingPrivate() {
    console.log('hahaha');
  }

  function doSomethingElsePrivate() {
    console.log('secret');
  }

  // Return an object exposed to the public
  return {
    // Add items to our basket
    addItem: function (values) {
      basket.push(values);
    },
    // Get the count of items in the basket
    getItemCount: function () {
      return basket.length;
    },
    // Public alias to a private function
    doSomething: doSomethingPrivate,
    // Call private function from public funcion, hiding its functionality
    doSomethingElse: function () {
      return doSomethingElsePrivate();
    },
    // Get the total value of items in the basket
    getTotal: function () {
      var q = this.getItemCount(),
        p = 0;

      while (q--) {
        p += basket[q].price;
      }

      return p;
    }
  };
})();

// basketModule returns an object with a public API we can use
basketModule.addItem({
  item: "bread",
  price: 0.5
});

basketModule.addItem({
  item: "butter",
  price: 0.3
});

console.log(basketModule.getItemCount()); // 2

console.log(basketModule.getTotal()); // 0.8

// However, the following will not work:
console.log(basketModule.basket); // undefined
// This is because the basket itself is not exposed as a part of our
// public API

// This also won't work as it only exists within the scope of our
// basketModule closure, but not in the returned public object
// console.log(basket); // ReferenceError

basketModule.doSomething(); // 'hahaha'

console.log(basketModule.doSomething); // '[Function doSomethingPrivate]'

console.log(basketModule.doSomething.toString()); // 'function doSomethingPrivate() { console.log('hahaha'); }'

basketModule.doSomethingElse(); // 'secret'

console.log(basketModule.doSomethingElse); // '[Function doSomethingElse]'

console.log(basketModule.doSomethingElse.toString()); // 'function () { return doSomethingElsePrivate() }'
