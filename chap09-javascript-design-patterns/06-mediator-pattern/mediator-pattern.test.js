const assert = require('assert')

const mediator = require('./mediator-pattern')

describe('Mediator Pattern - Unit Tests', () => {
  describe('Employee Mediator Example', () => {
    it('should retrieve the employee`s manager', (done) => {
      mediator.getEmployeesManager(1)
        .then(manager => {
          assert.strict.equal(manager.name, 'Bob')
          done()
        })
        .catch(done)
    })

    it('should return a not found error', async () => {
      try {
        await mediator.getEmployeesManager(3)
        assert.fail('Should have returned Not Found Error!')
      } catch (err) {
        assert.strict.deepEqual(String(err), 'Error: 3 not found.')
      }
    })
  })
})
