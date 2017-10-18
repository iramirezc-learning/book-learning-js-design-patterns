//- Import Mixins

// dummy jQuery
var jQuery = function noop() { return jQuery };

jQuery.html = function noop() { /* ... */ };

// dummy underscore
var _ = function noop() { /* ... */ };

_.min = function noop() { /* ... */ };

// Global module
var myModule = (function (jQ, _) {

  function privateMethod1() {
    jQ(".container").html("test");
  }

  function privateMethod2() {
    console.log(_.min([10, 5, 100, 2, 1000]));
  }

  return {
    publicMethod: function () {
      privateMethod1();
    }
  };

  // Pull in jQuery and Underscore
})(jQuery, _);

myModule.publicMethod(); // executes privateMethod1

//- Exports

// Global module
var myModuleExports = (function () {
  // Module object
  var internalModule = {};
  var privateVariable = "Hello World";

  function privateMethod() {
    // ...
  }

  internalModule.publicProperty = "Foobar";
  internalModule.publicMethod = function () {
    console.log(privateVariable);
  };

  return internalModule;
})();

console.log(myModuleExports.publicProperty); // 'Foobar'
myModuleExports.publicMethod(); // 'Hello World'

myModuleExports.newFunctionality = function () {
  console.log("Hey! I'm new");
};

myModuleExports.newFunctionality(); // 'Hey I'm new'

console.log(Object.getOwnPropertyNames(myModuleExports)); // ['publicProperty', 'publicMethod', 'newFunctionality']