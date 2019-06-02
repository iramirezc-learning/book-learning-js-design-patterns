const assert = require('assert')

const { Vehicle, createVehicle, Airplane, createAirplane, Boat, linkProto } = require('./prototype-pattern')

describe('Prototype Pattern - Unit Tests', () => {
  describe('Object.create', () => {
    it('should inherit from Vehicle', () => {
      const vehicle = createVehicle({
        model: {
          value: 'Ioniq',
          enumerable: true
        }
      })

      assert.strict.equal(vehicle.getModel(), 'My vehicle model is: Ioniq')
      assert.strict.equal(Object.hasOwnProperty.call(vehicle, 'model'), true)
      assert.strict.equal(Object.hasOwnProperty.call(vehicle, 'getModel'), false)
      assert.strict.equal(Object.getPrototypeOf(vehicle), Vehicle)
    })
  })

  describe('Simulating Object.create', () => {
    it('should inherit from Airplane', () => {
      const airplane = createAirplane({
        model: 'Cessna'
      })

      assert.strict.equal(airplane.getModel(), 'My airplane model is: Cessna')
      assert.strict.equal(Object.hasOwnProperty.call(airplane, 'model'), true)
      assert.strict.equal(Object.hasOwnProperty.call(airplane, 'getModel'), false)
      assert.strict.equal(Object.getPrototypeOf(airplane), Airplane)
    })

    it('should inherit from Boat', () => {
      const boat = linkProto(Boat)
      boat.init({ model: 'Serenity' })
      assert.strict.equal(boat.getModel(), 'My boat model is: Serenity')
      assert.strict.equal(Object.hasOwnProperty.call(boat, 'model'), true)
      assert.strict.equal(Object.hasOwnProperty.call(boat, 'getModel'), false)
      assert.strict.equal(Object.getPrototypeOf(boat), Boat)
    })
  })
})
