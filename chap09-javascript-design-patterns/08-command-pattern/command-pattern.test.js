const assert = require('assert')

const calculator = require('./command-pattern')

describe('Command Pattern - Unit Tests', () => {
  describe('Calculator', () => {
    it('should add all numbers', () => {
      assert.strictEqual(calculator.execute('sum', 1, 2, 3, 4, 5), 15)
    })

    it('should multiply all numbers', () => {
      assert.strictEqual(calculator.execute('multiply', 1, 2, 3, 4, 5), 120)
    })

    it('should divide all numbers', () => {
      assert.strictEqual(calculator.execute('divide', 1000, 10), 100)
    })
  })
})
