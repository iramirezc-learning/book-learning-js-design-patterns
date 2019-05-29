const assert = require('assert')

const CarBasic = require('./basic-constructors')
const Car = require('./constructors-with-prototypes')

describe('Constructor Pattern - Unit Tests', () => {
  describe('Object Creation', () => {
    function defineProp (obj, key, value) {
      const config = {
        value,
        writable: true,
        enumerable: true,
        configurable: true
      }
      Object.defineProperty(obj, key, config)
    }

    describe('ways to create an object', () => {
      it('should create an object using the literal {}', () => {
        const obj = {}
        assert.strict.equal(obj instanceof Object, true)
        assert.strict.equal(typeof obj, 'object')
        assert.strict.deepEqual(obj, {})
      })

      it('should create an object using Object.create method', () => {
        const obj = Object.create(Object.prototype)
        assert.strict.equal(obj instanceof Object, true)
        assert.strict.equal(typeof obj, 'object')
        assert.strict.deepEqual(obj, {})
      })

      it('should create a new object using the constructor Object', () => {
        const obj = new Object() // eslint-disable-line
        assert.strict.equal(obj instanceof Object, true)
        assert.strict.equal(typeof obj, 'object')
        assert.strict.deepEqual(obj, {})
      })
    })

    describe('ways to assign and get values', () => {
      it('should set and get a value using dot notation', () => {
        const obj = {}
        obj.someKey = 'Hello'
        assert.strict.equal(obj.someKey, 'Hello')
      })

      it('should set and get a value using brackets notation', () => {
        const obj = Object.create(Object.prototype)
        obj['someKey'] = 'Hello'
        assert.strict.equal(obj['someKey'], 'Hello')
      })

      it('should set and get a value using Object.defineProperty method', () => {
        const obj = new Object() // eslint-disable-line
        Object.defineProperty(obj, 'someKey', {
          value: 'Hello',
          writable: true,
          enumerable: true,
          configurable: true
        })
        assert.strict.equal(obj.someKey, 'Hello')
      })

      it('should set and get a value using Object.defineProperties method', () => {
        const obj = {}
        Object.defineProperties(obj, {
          someKey: {
            value: 'Hello',
            writable: true,
            enumerable: true,
            configurable: true
          }
        })
        assert.strict.equal(obj.someKey, 'Hello')
      })

      it('should set and get a value when defining properties with Object.create', () => {
        const obj = Object.create({}, {
          someKey: {
            value: 'Hello',
            writable: true,
            enumerable: true,
            configurable: true
          }
        })
        assert.strict.equal(obj.someKey, 'Hello')
      })
    })

    describe('what is your prototype?', () => {
      it('should be Object.prototype when created with literal', () => {
        const obj = {}
        assert.strict.equal(Object.getPrototypeOf(obj), Object.prototype)
      })

      it('should be Object.prototype when created with Object.create', () => {
        const obj = Object.create(Object.prototype)
        assert.strict.equal(Object.getPrototypeOf(obj), Object.prototype)
      })

      it('should be Object.prototype when created with Object constructor', () => {
        const obj = new Object() // eslint-disable-line
        assert.strict.equal(Object.getPrototypeOf(obj), Object.prototype)
      })

      it('should not be Object.prototype when created with Object.create({})', () => {
        const obj = Object.create({})
        assert.strict.notEqual(Object.getPrototypeOf(obj), Object.prototype)
      })

      it('should not be Object.prototype when created with Object.create(new Object)', () => {
        // new Object === new Object() === {}
        const obj = Object.create(new Object) // eslint-disable-line
        assert.strict.notEqual(Object.getPrototypeOf(obj), Object.prototype)
      })

      it('should not be Object.prototype when created with Object.create(Object)', () => {
        const obj = Object.create(Object)
        assert.strict.notEqual(Object.getPrototypeOf(obj), Object.prototype)
      })
    })

    describe('defineProp helper function', () => {
      it('should add new properties to an object', () => {
        const person = Object.create(Object.prototype)
        defineProp(person, 'name', 'Isaac')
        defineProp(person, 'age', 30)
        assert.strict.equal(person.name, 'Isaac')
        assert.strict.equal(person.age, 30)
      })
    })

    describe('inheritance', () => {
      it('should inherit properties and methods from other object', () => {
        const person = Object.create(Object.prototype)
        defineProp(person, 'name', 'Isaac')
        defineProp(person, 'age', 30)

        const driver = Object.create(person)
        defineProp(driver, 'topSpeed', '100mph')

        assert.strict.equal(person.name, 'Isaac')
        assert.strict.equal(driver.name, 'Isaac')
        assert.strict.equal(person.age, 30)
        assert.strict.equal(driver.age, 30)
        assert.strict.equal(person.topSpeed, undefined)
        assert.strict.equal(driver.topSpeed, '100mph')

        // change person's name
        person.name = 'Nahum'
        assert.strict.equal(person.name, 'Nahum')
        assert.strict.equal(driver.name, 'Nahum') // inherited

        // change driver's name
        driver.name = 'Danni'
        assert.strict.equal(person.name, 'Nahum')
        assert.strict.equal(driver.name, 'Danni') // shadowed

        // change person's name one more time
        person.name = 'Saun'
        assert.strict.equal(person.name, 'Saun')
        assert.strict.equal(driver.name, 'Danni') // not affected
      })
    })
  })

  describe('Basic Constructors', () => {
    it('should create an instance of a Car', () => {
      const civic = new CarBasic('Honda Civic', 2017, 5000)
      const peugeot = new CarBasic('Peugeot 208', 2018, 3000)
      assert.strict.equal(civic.toString(), 'Honda Civic has done 5000 miles')
      assert.strict.equal(peugeot.toString(), 'Peugeot 208 has done 3000 miles')
    })
  })

  describe('Constructors with Prototypes', () => {
    it('should create an instance of a Car', () => {
      const civic = new Car('Honda Civic', 2017, 5000)
      const peugeot = new Car('Peugeot 208', 2018, 3000)
      assert.strict.equal(String(civic), 'Honda Civic has done 5000 miles')
      assert.strict.equal(String(peugeot), 'Peugeot 208 has done 3000 miles')
    })
  })
})
