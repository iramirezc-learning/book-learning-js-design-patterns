const assert = require('assert')

const literals = require('./object-literals')
const {
  counter,
  magicNamespace,
  basket
} = require('./the-module-pattern')
const {
  gQuery,
  exportsModule
} = require('./module-pattern-variations')

describe('Module Pattern - Unit Tests', () => {
  describe('Object Literals', () => {
    it('should say something', () => {
      assert.strict.equal(literals.saySomething(), 'Hey! Where is my cheese!')
    })

    it('should report my config', () => {
      assert.strict.equal(literals.reportMyConfig(), 'Caching is: enabled')
    })

    it('should update my config', () => {
      assert.strict.equal(literals.updateMyConfig({
        useCaching: false,
        language: 'fr'
      }), 'fr')
      assert.strict.equal(literals.reportMyConfig(), 'Caching is: disabled')
    })
  })

  describe('Module Pattern', () => {
    describe('counter module', () => {
      it('should increment and reset counter', () => {
        assert.strict.equal(counter.incrementCounter(), 0) // 1
        assert.strict.equal(counter.incrementCounter(), 1) // 2
        assert.strict.equal(counter.incrementCounter(), 2) // 3
        assert.strict.equal(counter.resetCounter(), 3)
        assert.strict.equal(counter.incrementCounter(), 0) // 1
      })
    })

    describe('magic namespace module', () => {
      it('should have access to the public var', () => {
        assert.strict.equal(magicNamespace.myPublicVar, 'Hi!')
      })

      it('should have access to the public method', () => {
        assert.strict.equal(magicNamespace.squaredMagic(3), 10)
        assert.strict.equal(magicNamespace.squaredMagic(3), 11)
        assert.strict.equal(magicNamespace.squaredMagic(5), 28)
      })
    })

    describe('basket module', () => {
      it('should add items and the the total price and count', () => {
        basket.addItem({
          item: 'bread',
          price: 0.5
        })

        basket.addItem({
          item: 'butter',
          price: 0.3
        })

        assert.strict.equal(basket.getItemCount(), 2)
        assert.strict.equal(basket.getTotal(), 0.8)
      })

      it('should not expose internal `basket` array', () => {
        assert.strict.equal(basket.basket, undefined)
      })

      it('should call public methods that calls private methods', () => {
        assert.strict.equal(basket.doSomething(), 'hahaha')
        assert.strict.equal(basket.doSomethingElse(), 'secret')
      })
    })

    describe('Module Pattern Variations', () => {
      describe('gQuery module', () => {
        it('should call private method that returns `hello` from public method', () => {
          assert.strict.equal(gQuery.publicMethod(), 'hello')
        })
      })

      describe('exportsModule', () => {
        it('should have access to the public var', () => {
          assert.strict.equal(exportsModule.publicProperty, 'Hello Public')
        })

        it('should have access to the public method that returns a private var', () => {
          assert.strict.equal(exportsModule.publicMethod(), 'Hello Private')
        })

        it('should attach a new public method', () => {
          exportsModule.newFunctionality = function () {
            return 'Hello New'
          }
          assert.strict.equal(exportsModule.newFunctionality(), 'Hello New')
          assert.strict.deepEqual(Object.getOwnPropertyNames(exportsModule), ['publicProperty', 'publicMethod', 'newFunctionality'])
        })
      })
    })
  })
})
