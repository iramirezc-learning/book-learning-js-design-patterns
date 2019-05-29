/**
 * Example of the Module Pattern using a IIFE
 */
var counter = (function () {
  var counter = 0

  return {
    incrementCounter: function () {
      return counter++
    },
    resetCounter: function () {
      const oldValue = counter
      counter = 0
      return oldValue
    }
  }
})()

/**
 * Example 2. Template
 */
var magicNamespace = (function () {
  // a private variable
  var magicPrivate = 0

  // private method
  var addMagic = function (n) {
    return magicPrivate + n
  }

  return {
    // a public var
    myPublicVar: 'Hi!',
    // a public method using privates
    squaredMagic: function (n) {
      // increments private var
      magicPrivate++
      // calls private method
      return addMagic(n * n)
    }
  }
})()

/**
 * Another Example. A Basket Module
 */
var basket = (function () {
  // privates
  var basket = []

  function doSomethingPrivate () {
    return 'hahaha'
  }

  function doSomethingElsePrivate () {
    return 'secret'
  }

  // Return an object exposed to the public
  return {
    // Add items to our basket
    addItem: function (values) {
      basket.push(values)
    },
    // Get the count of items in the basket
    getItemCount: function () {
      return basket.length
    },
    // Public alias to a private function
    doSomething: doSomethingPrivate,
    // Call private function from public function, hiding its functionality
    doSomethingElse: function () {
      return doSomethingElsePrivate()
    },
    // Get the total value of items in the basket
    getTotal: function () {
      var q = this.getItemCount()
      var p = 0

      while (q--) {
        p += basket[q].price
      }

      return p
    }
  }
})()

module.exports = {
  counter,
  magicNamespace,
  basket
}
