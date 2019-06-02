const assert = require('assert')

const Complex = require('./facade-pattern')

let complex
let logger
let argsHistory

describe('Facade Pattern - Unit Tests', () => {
  describe('Complex Example', () => {
    beforeEach(() => {
      argsHistory = []
      logger = args => { argsHistory.push(args) }
      complex = Complex({ logger })
    })

    it('should return the new value and run', () => {
      complex.facade({ run: true, val: 20 })
      assert.strict.deepEqual(argsHistory, [
        'current value: 20',
        'running at: 20 Kms/Hr'
      ])
    })
  })
})
