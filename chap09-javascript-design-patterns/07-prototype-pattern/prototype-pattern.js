const Vehicle = {
  getModel () {
    return `My vehicle model is: ${this.model}`
  }
}

const createVehicle = props => {
  return Object.create(Vehicle, props)
}

const Airplane = {
  init ({ model }) {
    this.model = model
  },
  getModel () {
    return `My airplane model is: ${this.model}`
  }
}

const createAirplane = (props) => {
  function F () {} // create a helper function
  F.prototype = Airplane // set the prototype
  var f = new F() // create a instance
  f.init(props) // initialize using prototype
  return f // return instance
}

const linkProto = (function () {
  function F () {}

  return function (proto) {
    F.prototype = proto
    return new F()
  }
}())

const Boat = {
  init ({ model }) {
    this.model = model
  },
  getModel () {
    return `My boat model is: ${this.model}`
  }
}

module.exports = {
  Vehicle,
  createVehicle,
  Airplane,
  createAirplane,
  Boat,
  linkProto
}
