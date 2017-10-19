var myRevealingModule = (function () {
  var privateVar = 'Isaac Ramírez';
  var publicVar = 'Hey there!';

  function privateFunction() {
    console.log('private: ' + privateVar);
  }

  function publicSetName(strName) {
    privateVar = strName;
  }

  function publicGetName() {
    privateFunction();
  }

  // reveal public pointers
  // to functions and properties

  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName,
  };
})();

myRevealingModule.getName();  // 'Isaac Ramírez'
myRevealingModule.setName('Nahum');
myRevealingModule.getName();  // 'Nahum'



var myRevealingModule2 = (function () {
  var privateCounter = 0;

  function privateFunction() {
    privateCounter++;
  }

  function publicFunction() {
    publicIncrement();
  }

  function publicIncrement() {
    privateFunction();
  }

  function publicGetCount() {
    return privateCounter;
  }

  // Reveal public pointers to
  // private functions and properties
  return {
    start: publicFunction,
    increment: publicIncrement,
    count: publicGetCount
  };
}());

myRevealingModule2.start();
console.log(myRevealingModule2.count()); // 1
