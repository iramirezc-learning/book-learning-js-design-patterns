const assert = require('assert')


const { Interface } = require('./Interface')
const { Vehicle, MacBook, MacBookDecorators } = require('./decorator-pattern')
const { MacBookDecorator, MacBookPro, PRICES } = require('./abstract-decorators')
const extend = require('./extend')

describe('Decorator Pattern - Unit Tests', () => {
  describe('Decorating Constructors instances', () => {
    it('should extend the functionality of a Vehicle instance by adding a new `setColor` method', () => {
      const car = new Vehicle()
      const truck = new Vehicle('truck')

      // decorating a truck with a new method
      Object.defineProperty(truck, 'setColor', {
        value: function (newColor) {
          this.color = newColor
        }
      })

      truck.setColor('black')

      assert.deepEqual(car, {
        type: 'car',
        model: 'default',
        serialNumber: 'SN-#####'
      })

      assert.deepEqual(truck, {
        type: 'truck',
        model: 'default',
        serialNumber: 'SN-#####',
        color: 'black'
      })

    })
  })

  describe('Decorating Objects', () => {
    describe('MacBook', () => {
      it('should increment its cost using the MacBookDecorators', () => {
        const mac = new MacBook()

        assert.strictEqual(mac.cost(), 40000)
        assert.strictEqual(mac.screenSize(), 12)

        MacBookDecorators.memory(mac) // adds 500
        MacBookDecorators.engraving(mac) // adds 250
        MacBookDecorators.insurance(mac) // adds 300 

        assert.strictEqual(mac.cost(), 41050)
        assert.strictEqual(mac.screenSize(), 12, 'screenSize should not change')
      })
    })
  })

  describe('Pseudo Classical Decorators', () => {
    describe('Interfaces - by Dustin Diaz and Ross Harmes', () => {
      it('should validate that a class implements an Interface', () => {
        const reminderInterface = new Interface('List', ['summary', 'placeOrder'])

        const Todo = function (props) {
          Interface.ensureImplements(props.actions, reminderInterface)
          this.name = props.name;
          this.methods = props.actions
        }

        let todo

        assert.doesNotThrow(() => {
          // create a new instance
          todo = new Todo({
            name: 'Remember to buy milk',
            date: Date.now(),
            actions: {
              summary() {
                return 'Remember to buy the milk, we`re almost out!'
              },
              placeOrder() {
                return 'Ordering milk from your local grocery store'
              }
            }
          })
        })

        assert.strictEqual(todo.methods.summary(), 'Remember to buy the milk, we`re almost out!')
        assert.strictEqual(todo.methods.placeOrder(), 'Ordering milk from your local grocery store')
      })

      it('should throw an exception if a class does not implements the Interface required', () => {
        const carInterface = new Interface('panel', ['drive', 'pullOver'])
        const Car = function (props) {
          Interface.ensureImplements(props.actions, carInterface)
          this.name = props.name
          this.methods = props.actions
        }

        assert.throws(() => {
          new Car({
            name: 'Ioniq',
            actions: {
              drive() {
                return `I'm Driving!`
              }
            }
          })
        }, /TypeError: Interface\.ensureImplements: object does NOT implement the interface: 'panel'\. Method 'pullOver' not found\./)

        assert.throws(() => {
          new Car({
            name: 'Ioniq',
            actions: {
              drive: `I'm Driving!`
            }
          })
        }, /TypeError: Interface\.ensureImplements: object does NOT implement the interface: 'panel'\. Method 'drive' not found\./)
      })

      it('should throw an exception if a method is not a string when creating a new Interface', () => {
        assert.throws(() => {
          new Interface('test', ['goodName', 123])
        }, /TypeError: Interface constructor expects method names to be type of 'string', but given 'number' at index '1'\./)
      })

      it('should throw an exception when calling Interface constructor with arguments.length different than 2', () => {
        assert.throws(() => {
          new Interface('test')
        }, /Error: Interface constructor called with 1 arguments, but expected exactly 2\./)
      })

      it('should throw an exception when calling Interface.ensureImplements with less than 2 arguments', () => {
        assert.throws(() => {
          Interface.ensureImplements({})
        }, /Error: Interface\.ensureImplements called with '1' arguments, but expected at least 2\./)
      })

      it('should throw an exception when calling Interface.ensureImplements with an invalid interface instance', () => {
        assert.throws(() => {
          const myCustomInterface = {
            name: 'test',
            methods: ['method1']
          }

          const myPropsObj = {
            actions: {
              method1() {
                return 1
              }
            }
          }

          Interface.ensureImplements(myPropsObj.actions, myCustomInterface)
        }, /Error: Interface.ensureImplements expects argument at index '1' to be instance of Interface/)
      })
    })

    describe('Abstract Decorators', () => {
      describe('CaseDecorator', () => {
        it('should increment the cost of a MacBookPro by decorating with the CaseDecorator', () => {
          // custom CaseDecorator
          const CaseDecorator = function(macBook) {
            MacBookDecorator.call(this, macBook)
          }

          // extend CaseDecorator with MacBookDecorator
          extend(CaseDecorator.prototype, MacBookDecorator.prototype)


          // override 'addCase' and 'getPrice' methods
          CaseDecorator.prototype.addCase = function() {
            return 'adding extra case'
          }

          CaseDecorator.prototype.getPrice = function() {
            return this.macBook.getPrice() + PRICES.CASE
          }

          // create a new MacBookPro
          const mbp = new MacBookPro()

          assert.strictEqual(mbp.type, 'mac_book_pro')
          assert.strictEqual(mbp.addEngraving(), 'adding engraving')
          assert.strictEqual(mbp.addParallels(), 'adding parallels')
          assert.strictEqual(mbp.addRamMemory(), 'adding ram memory')
          assert.strictEqual(mbp.addCase(), 'adding case')
          assert.strictEqual(mbp.getPrice(), 9000)

          const mbpPlusCase = new CaseDecorator(mbp)

          assert.strictEqual(mbpPlusCase.macBook.type, 'mac_book_pro')
          assert.strictEqual(mbpPlusCase.addEngraving(), 'adding engraving')
          assert.strictEqual(mbpPlusCase.addParallels(), 'adding parallels')
          assert.strictEqual(mbpPlusCase.addRamMemory(), 'adding ram memory')
          assert.strictEqual(mbpPlusCase.addCase(), 'adding extra case')
          assert.strictEqual(mbpPlusCase.getPrice(), 10000)
        })

        it('should throw an exception if a class does not fulfill the MacBookDecorator interface', () => {
          const RamDecorator = function(macBook) {
            MacBookDecorator.call(this, macBook)
          }

          // extend CaseDecorator with MacBookDecorator
          extend(RamDecorator.prototype, MacBookDecorator.prototype)

          const MacBookStandard = function (props = {}) {
            this.type = props.type || 'standard'
          }

          const mbs = new MacBookStandard()

          assert.throws(() => {
            new RamDecorator(mbs)
          }, /TypeError: Interface\.ensureImplements: object does NOT implement the interface: 'MacBook'\. Method 'addEngraving' not found\./)
        })
      })
    })
  })
})