var nameModule = (function () {
  var privateVar = 'Isaac Ramírez'
  var publicVar = 'Hey there!'

  function privateFunction () {
    return privateVar
  }

  function publicSetName (strName) {
    privateVar = strName
  }

  function publicGetName () {
    return privateFunction()
  }

  // reveal public pointers
  // to functions and properties

  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  }
})()

var counterModule = (function () {
  var privateCounter = 0

  function privateIncrement () {
    return privateCounter++
  }

  function publicStart () {
    return publicIncrement()
  }

  function publicIncrement () {
    return privateIncrement()
  }

  function publicGetCount () {
    return privateCounter
  }

  // Reveal public pointers to
  // private functions and properties
  return {
    start: publicStart,
    increment: publicIncrement,
    count: publicGetCount
  }
}())

module.exports = {
  nameModule,
  counterModule
}
