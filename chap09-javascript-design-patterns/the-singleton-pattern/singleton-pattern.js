//- Example 1
var mySingleton = (function () {
  var instance;

  function init() {
    var privateVar = "I'm a private var.";

    var privateRandomNumber = Math.random();

    function privateMethod() {
      console.log("I'm a private method.");
    }

    return {
      publicProperty: "I'm a public var.",
      publicMethod: function () {
        console.log("I'm a public method.");
      },
      getRandomNumber: function () {
        return privateRandomNumber;
      }
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }

      return instance;
    },
  };
}());

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();

console.log('isSingleton?->', singleA.getRandomNumber(), singleB.getRandomNumber(), singleA.getRandomNumber() === singleB.getRandomNumber());

var myBadSingleton = (function () {
  var instance;

  function init() {
    var privateRandomNumber = Math.random();

    return {
      getRandomNumber: function () {
        return privateRandomNumber;
      },
    };
  }

  return {
    getInstance: function () {
      instance = init();

      return instance;
    },
  };
})();

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();

console.log('isSingleton?->', badSingleA.getRandomNumber(), badSingleB.getRandomNumber(), badSingleA.getRandomNumber() === badSingleB.getRandomNumber());

//- Example 2
var SingletonTester = (function () {
  function Singleton(options) {
    options = options || {};
    this.name = 'Singleton Tester';
    this.pointX = options.pointX || 6;
    this.pointY = options.pointY || 10;
  }

  var instance;

  var _static = {
    name: 'Singleton Tester',
    getInstance: function (options) {
      if (instance === undefined) {
        instance = new Singleton(options);
      }

      return instance;
    },
  };

  return _static;
})();

var singletonTest = SingletonTester.getInstance({
  pointX: 5,
});

console.log(singletonTest.pointX); // 5

var singletonTest2 = SingletonTester.getInstance();

console.log(singletonTest2.pointX); // 5
