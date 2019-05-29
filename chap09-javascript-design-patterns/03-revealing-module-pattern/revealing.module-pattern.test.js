const assert = require('assert')

const { nameModule, counterModule } = require('./revealing-module-pattern')

describe('Revealing Module Pattern - Unit Tests', () => {
  describe('Name module', () => {
    it('should get the name which is private', () => {
      assert.strict.equal(nameModule.getName(), 'Isaac Ramírez')
    })

    it('should set a new name changing the private var', () => {
      nameModule.setName('Nahum')
      assert.strict.equal(nameModule.getName(), 'Nahum')
    })
  })

  describe('Counter Module', () => {
    it('should start the counter, increment the counter and return the count', () => {
      assert.strict.equal(counterModule.start(), 0) // increments to 1 but returns initial count 0
      assert.strict.equal(counterModule.increment(), 1) // increments to 2, but returns current counter
      assert.strict.equal(counterModule.count(), 2)
    })
  })
})
