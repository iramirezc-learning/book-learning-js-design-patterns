/**
 * Import Mixins. This pattern demonstrate how globals
 * can be passed in as arguments to our encapsulated module
 */

// mock jQuery
var jQuery = selector => jQuery

jQuery.html = str => str

// mock underscore
var _ = function noop () { /* ... */ }

_.min = function noop () { /* ... */ }

// Global module
var gQuery = (function (jQ, _) {
  function privateMethod1 () {
    return jQ('.container').html('hello')
  }

  function privateMethod2 () { // eslint-disable-line
    console.log(_.min([10, 5, 100, 2, 1000]))
  }

  return {
    publicMethod: function () {
      return privateMethod1()
    }
  }

  // Pull in jQuery and Underscore
})(jQuery, _)

/**
 * Exports. Global module. This pattern encapsulates the globals
 * in a single module without polluting the global scope.
 */
var exportsModule = (function () {
  // Module object
  var internalModule = {}
  var privateVariable = 'Hello Private'

  function privateMethod () { // eslint-disable-line
    // ...
  }

  internalModule.publicProperty = 'Hello Public'
  internalModule.publicMethod = function () {
    return privateVariable
  }

  return internalModule
})()

module.exports = {
  gQuery,
  exportsModule
}
