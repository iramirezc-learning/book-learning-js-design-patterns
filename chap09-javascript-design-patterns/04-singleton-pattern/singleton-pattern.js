/**
 * Example 1. Singleton
 */
var singleton = (function () {
  var instance

  function init () {
    var privateVar = 'privateSecret'

    var privateRandomNumber = Math.random()

    function privateMethod () { // eslint-disable-line
      return privateVar
    }

    return {
      publicProperty: 'publicSecret',
      publicMethod: function () {
        return this.publicProperty
      },
      getRandomNumber: function () {
        return privateRandomNumber
      }
    }
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = init()
      }

      return instance
    }
  }
}())

/**
 * Example 2. Bad Singleton
 */
var badSingleton = (function () {
  var instance

  function init () {
    var privateRandomNumber = Math.random()

    return {
      getRandomNumber: function () {
        return privateRandomNumber
      }
    }
  }

  return {
    getInstance: function () {
      instance = init()

      return instance
    }
  }
})()

/**
 * Example 2. Singleton Tester
 */
var singletonTester = (function () {
  function Singleton (options) {
    options = options || {}
    this.name = 'Singleton Tester'
    this.pointX = options.pointX || 0
    this.pointY = options.pointY || 0
  }

  var instance

  var singleton = {
    name: 'Singleton Tester',
    getInstance: function (options) {
      if (instance === undefined) {
        instance = new Singleton(options)
      }

      return instance
    }
  }

  return singleton
})()

module.exports = {
  singleton,
  badSingleton,
  singletonTester
}
