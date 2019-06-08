const assert = require('assert')

const { Car, Truck, VehicleFactory, TruckFactory, AbstractVehicleFactory } = require('./factory-pattern')

describe('Factory Pattern - Unit Tests', () => {
  describe('Vehicle Factory', () => {
    let carFactory

    beforeEach(() => {
      carFactory = new VehicleFactory()
    })

    it('should create an instance of a Car by default if no `vehicleType` provided', () => {
      const car = carFactory.createVehicle({
        doors: 4,
        state: 'used',
        color: 'yellow'
      })

      assert.strictEqual(car.doors, 4)
      assert.strictEqual(car.state, 'used')
      assert.strictEqual(car.color, 'yellow')
      assert.strictEqual(car instanceof Car, true)
      assert.strictEqual(carFactory.vehicleClass, Car)
      assert.strictEqual(Object.hasOwnProperty.call(carFactory, 'vehicleClass'), false)
    })

    it('should create an instance of a Car', () => {
      const car = carFactory.createVehicle({
        vehicleType: 'car',
        doors: 5,
        state: 'semi',
        color: 'green'
      })

      assert.strictEqual(car.doors, 5)
      assert.strictEqual(car.state, 'semi')
      assert.strictEqual(car.color, 'green')
      assert.strictEqual(car instanceof Car, true)
      assert.strictEqual(carFactory.vehicleClass, Car)
      assert.strictEqual(Object.hasOwnProperty.call(carFactory, 'vehicleClass'), true)
    })

    it('should create an instance of a Truck', () => {
      const truck = carFactory.createVehicle({
        vehicleType: 'truck',
        state: 'like new',
        color: 'orange',
        wheelSize: 'monster truck'
      })

      assert.strictEqual(truck.state, 'like new')
      assert.strictEqual(truck.color, 'orange')
      assert.strictEqual(truck.wheelSize, 'monster truck')
      assert.strictEqual(truck instanceof Truck, true)
      assert.strictEqual(carFactory.vehicleClass, Truck)
    })
  })

  describe('Truck Factory', () => {
    let truckFactory

    beforeEach(() => {
      truckFactory = new TruckFactory()
    })

    it('should create an instance of a Truck by default', () => {
      const truck = truckFactory.createVehicle({
        state: 'hell yeah!',
        color: 'gold',
        wheelSize: 'large'
      })

      assert.strictEqual(truck.state, 'hell yeah!')
      assert.strictEqual(truck.color, 'gold')
      assert.strictEqual(truck.wheelSize, 'large')
      assert.strictEqual(truck instanceof Truck, true)
      assert.strictEqual(truckFactory.vehicleClass, Truck)
      assert.strictEqual(Object.hasOwnProperty.call(truckFactory, 'vehicleClass'), false)
    })

    it('should create an instance of a Truck', () => {
      const truck = truckFactory.createVehicle({
        vehicleType: 'truck',
        state: 'old',
        color: 'black',
        wheelSize: 'medium'
      })

      assert.strictEqual(truck.state, 'old')
      assert.strictEqual(truck.color, 'black')
      assert.strictEqual(truck.wheelSize, 'medium')
      assert.strictEqual(truck instanceof Truck, true)
      assert.strictEqual(truckFactory.vehicleClass, Truck)
      assert.strictEqual(Object.hasOwnProperty.call(truckFactory, 'vehicleClass'), true)
    })

    it('should create an instance of a Car', () => {
      const car = truckFactory.createVehicle({
        vehicleType: 'car',
        state: 'meh!',
        color: 'blue',
        doors: 3
      })

      assert.strictEqual(car.state, 'meh!')
      assert.strictEqual(car.color, 'blue')
      assert.strictEqual(car.doors, 3)
      assert.strictEqual(car instanceof Car, true)
      assert.strictEqual(truckFactory.vehicleClass, Car)
    })
  })

  describe('Abstract Vehicle Factory', () => {
    it('should register and get an instance of a Car', () => {
      const abstractVehicleFactory = new AbstractVehicleFactory()
      abstractVehicleFactory.registerVehicle('car', Car)

      const car = abstractVehicleFactory.getVehicle('car', {
        doors: 3,
        color: 'pink',
        state: 'brand new'
      })

      assert.strictEqual(car.doors, 3)
      assert.strictEqual(car.color, 'pink')
      assert.strictEqual(car.state, 'brand new')
      assert.strictEqual(car instanceof Car, true)
      assert.strictEqual(car.drive(), 'car is driving')
      assert.strictEqual(car.breakDown(), 'car is breaking down')
    })

    it('should register and get an instance of a Truck', () => {
      const abstractVehicleFactory = new AbstractVehicleFactory()
      abstractVehicleFactory.registerVehicle('truck', Truck)

      const truck = abstractVehicleFactory.getVehicle('truck', {
        state: 'oldie',
        wheelSize: 'small',
        color: 'gray'
      })

      assert.strictEqual(truck.state, 'oldie')
      assert.strictEqual(truck.wheelSize, 'small')
      assert.strictEqual(truck.color, 'gray')
      assert.strictEqual(truck instanceof Truck, true)
      assert.strictEqual(truck.drive(), 'truck is driving')
      assert.strictEqual(truck.breakDown(), 'truck is breaking down')
    })

    it('should not register a Vehicle if doesn`t fulfill the contract and return null', () => {
      function ProtoCar (props) {
        this.color = props.color || 'white'
        this.material = props.material || 'metal'
      }

      ProtoCar.prototype.drive = function () {
        return 'proto car is driving'
      }

      const abstractVehicleFactory = new AbstractVehicleFactory()
      abstractVehicleFactory.registerVehicle('proto_car', ProtoCar)

      const protoCar = abstractVehicleFactory.getVehicle('proto_car', {
        color: 'purple',
        material: 'aluminum'
      })

      assert.strictEqual(protoCar, null)

      const otherProtoCar = new ProtoCar({
        color: 'invisible',
        material: 'glass'
      })

      assert.strictEqual(otherProtoCar.color, 'invisible')
      assert.strictEqual(otherProtoCar.material, 'glass')
      assert.strictEqual(otherProtoCar instanceof ProtoCar, true)
      assert.strictEqual(otherProtoCar.drive(), 'proto car is driving')
    })

    it('should register multiple Vehicles', () => {
      function ProtoCar (props) {
        this.color = props.color || 'white'
        this.material = props.material || 'metal'
      }

      ProtoCar.prototype.drive = function () {
        return 'proto car is driving'
      }

      ProtoCar.prototype.breakDown = function () {
        return 'proto car is breaking down'
      }

      const abstractVehicleFactory = new AbstractVehicleFactory()

      abstractVehicleFactory
        .registerVehicle('proto_car', ProtoCar)
        .registerVehicle('car', Car)
      
      const protoCar = abstractVehicleFactory.getVehicle('proto_car', {
        color: 'green yellow'
      })

      const car = abstractVehicleFactory.getVehicle('car', {
        color: 'green lime'
      })

      assert.strictEqual(protoCar.color, 'green yellow')
      assert.strictEqual(protoCar instanceof ProtoCar, true)
      assert.strictEqual(protoCar.breakDown(), 'proto car is breaking down')

      assert.strictEqual(car.color, 'green lime')
      assert.strictEqual(car instanceof Car, true)
      assert.strictEqual(car.breakDown(), 'car is breaking down')
    })
  })
})