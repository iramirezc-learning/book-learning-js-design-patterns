const assert = require('assert')

const { Person, Superhero, CarAnimator, PersonAnimator, Car, augment, VehicleMixin } = require('./mixin-pattern')

describe('Mixin Pattern - Unit Tests', () => {
  describe('Sub-Classing', () => {
    describe('Person Class', () => {
      it('should create an instance of a Person', () => {
        const person = new Person({
          firstName: 'Isaac',
          lastName: 'Ramírez'
        })
  
        assert.deepEqual(person, {
          firstName: 'Isaac',
          lastName: 'Ramírez',
          gender: 'male'
        })
      })
    })

    describe('Superhero Class', () => {
      it('should create an instance of a Superhero that extends Person', () => {
        const spiderman = new Superhero({
          firstName: 'Ben',
          lastName: 'Parker',
          alias: 'Spiderman',
          powers: ['super human strength', 'precognitive spider sense', 'genius level intellect']
        })

        assert.deepEqual(spiderman, {
          firstName: 'Ben',
          lastName: 'Parker',
          gender: 'male',
          alias: 'Spiderman',
          powers: ['super human strength', 'precognitive spider sense', 'genius level intellect']
        })
      })
    })
  })

  describe('Mixins - Extend', () => {
    describe('CarAnimator', () => {
      it('should inherit MovementMixins', () => {
        const car = new CarAnimator()

        assert.strictEqual(car.moveLeft(), 'turning to left')
        assert.strictEqual(car.moveRight(), 'turning to right')
        assert.strictEqual(car.moveUp(), 'going up')
        assert.strictEqual(car.moveDown(), 'going down')
        assert.strictEqual(car.stop(), 'stopping')
      })
    })

    describe('PersonAnimator', () => {
      it('should inherit MovementMixins', () => {
        const person = new PersonAnimator()

        assert.strictEqual(person.moveUp(), 'going up')
        assert.strictEqual(person.moveDown(), 'going down')
        assert.strictEqual(person.stop(), 'stopping')
      })
    })
  })

  describe('Mixin - Augment', () => {
    describe('Car Class', () => {
      it('should inherit only `driveForward` and `driveBackwards` methods', () => {
        const car = new Car({
          model: 'Ioniq',
          color: 'white'
        })

        assert.deepEqual(car, {
          model: 'Ioniq',
          color: 'white'
        })

        assert.strictEqual(car.driveForward(), 'driving forward')
        assert.strictEqual(car.driveBackwards(), 'driving backwards')
        assert.throws(() => {
          car.driveSideways()
        }, /TypeError/)
      })
    })

    describe('VehicleMixin', () => {
      it('should augment any Class with all the mixin methods', () => {
        function Motorcycle() { /* noop */ }
        augment(Motorcycle, VehicleMixin)
        const bike = new Motorcycle()
        assert.strictEqual(bike.driveForward(), 'driving forward')
        assert.strictEqual(bike.driveBackwards(), 'driving backwards')
        assert.strictEqual(bike.driveSideways(), 'driving sideways')
      })
    })
  })
})
