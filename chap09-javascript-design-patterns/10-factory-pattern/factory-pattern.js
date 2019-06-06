/**
 * Constructor for Car
 */
function Car (props) {
  this.doors = props.doors || 4
  this.state = props.state || 'new'
  this.color = props.color || 'silver'
}

Car.prototype.drive = function () {
  return 'car is driving'
}

Car.prototype.breakDown = function () {
  return 'car is breaking down'
}

/**
 * Constructor for Truck
 */
function Truck (props) {
  this.state = props.state || 'new'
  this.wheelSize = props.wheelSize || 'large'
  this.color = props.color || 'blue'
}

Truck.prototype.drive = function () {
  return 'truck is driving'
}

Truck.prototype.breakDown = function () {
  return 'truck is breaking down'
}

/**
 * Vehicle Factory
 */
function VehicleFactory () {}

VehicleFactory.prototype.vehicleClass = Car

VehicleFactory.prototype.createVehicle = function (props) {
  switch(props.vehicleType) {
    case 'car':
      this.vehicleClass = Car
      break
    case 'truck':
      this.vehicleClass = Truck
      break
  }

  // defaults to VehicleFactory.prototype.vehicleClass (Car)
  return new this.vehicleClass(props)
}

/**
 * Truck Factory
 */

function TruckFactory () {}
// prototype for TruckFactory will be an instance of VehicleFactory
TruckFactory.prototype = new VehicleFactory()
// shadow VehicleFactory.prototype.vehicleClass
TruckFactory.prototype.vehicleClass = Truck


/**
 * Abstract Vehicle Factory
 */

function AbstractVehicleFactory () {
  const types = {}

  return {
    getVehicle(type, props) {
      const Vehicle = types[type]
      
      return (Vehicle ? new Vehicle(props) : null)
    },
    registerVehicle (type, Vehicle) {
      const proto = Vehicle.prototype

      // only register classes that fulfill the Vehicle contract
      if(proto.drive && proto.breakDown) {
        types[type] = Vehicle
      }

      return this
    }
  }
}

module.exports = {
  Car,
  Truck,
  VehicleFactory,
  TruckFactory,
  AbstractVehicleFactory
}
