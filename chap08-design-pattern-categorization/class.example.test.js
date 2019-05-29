const assert = require('assert')
const Car = require('./class.example')

describe('Car Class Example - Unit Tests', () => {
  it('should create an instance of a Car', () => {
    const myCar = new Car('Ford')
    myCar.year = '2010'
    assert.strict.equal(myCar.getInfo(), 'Ford 2010')
  })
})
