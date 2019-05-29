const assert = require('assert')

const { singleton, badSingleton, singletonTester } = require('./singleton-pattern')

describe('Singleton Pattern - Unit Tests', () => {
  describe('Good singleton', () => {
    it('should get the same instance', () => {
      const singletonA = singleton.getInstance()
      const singletonB = singleton.getInstance()
      assert.strict.equal(singletonA, singletonB)
    })

    it('should return the same public property', () => {
      const singletonA = singleton.getInstance()
      const singletonB = singleton.getInstance()
      assert.strict.equal(singletonA.publicProperty, singletonB.publicProperty)
    })

    it('should return the same result when calling `publicMethod`', () => {
      const singletonA = singleton.getInstance()
      const singletonB = singleton.getInstance()
      assert.strict.equal(singletonA.publicMethod(), 'publicSecret')
      assert.strict.equal(singletonA.publicMethod(), singletonB.publicMethod())
    })

    it('should return the same random number', () => {
      const singletonA = singleton.getInstance()
      const singletonB = singleton.getInstance()
      assert.strict.equal(singletonA.getRandomNumber(), singletonB.getRandomNumber())
    })
  })

  describe('Bad singleton', () => {
    it('should get different instances', () => {
      const badSingletonA = badSingleton.getInstance()
      const badSingletonB = badSingleton.getInstance()
      assert.strict.notEqual(badSingletonA, badSingletonB)
    })

    it('should get different random number', () => {
      const badSingletonA = badSingleton.getInstance()
      const badSingletonB = badSingleton.getInstance()
      assert.strict.notEqual(badSingletonA.getRandomNumber(), badSingletonB.getRandomNumber())
    })
  })

  describe('Singleton tester', () => {
    it('should initialize an instance with the options provided', () => {
      const testSingleton = singletonTester.getInstance({
        pointX: 3,
        pointY: 5
      })
      assert.strict.equal(testSingleton.pointX, 3)
      assert.strict.equal(testSingleton.pointY, 5)
    })

    it('should keep the values as before [do not write tests that depend from other tests]', () => {
      const testSingleton = singletonTester.getInstance({
        pointX: 1, // won't initialize again
        pointY: 1 // won't initialize again
      })
      assert.strict.equal(testSingleton.pointX, 3)
      assert.strict.equal(testSingleton.pointY, 5)
    })
  })
})
