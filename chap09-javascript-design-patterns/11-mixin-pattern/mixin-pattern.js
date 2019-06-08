const Person = function (props) {
  this.firstName = props.firstName || ''
  this.lastName = props.lastName || ''
  this.gender = props.gender || 'male'
}

const Superhero = function (props) {
  Person.call(this, props)
  this.alias = props.alias || ''
  this.powers = props.powers || []
}

const MovementMixins = {
  moveUp() {
    return 'going up'
  },
  moveDown() {
    return 'going down'
  },
  stop() {
    return 'stopping'
  }
}

const CarAnimator = function () {
  this.moveLeft = () => 'turning to left'
  this.moveRight = () => 'turning to right'
}

const PersonAnimator = function () {
  /* all functionality will be extended */
}

Object.assign(CarAnimator.prototype, MovementMixins)
Object.assign(PersonAnimator.prototype, MovementMixins)

const Car = function(props) {
  this.color = props.color || ''
  this.model = props.model || ''
}

const VehicleMixin = function () {
  /* no properties */
}

VehicleMixin.prototype = {
  driveForward() {
    return 'driving forward'
  },
  driveBackwards() {
    return 'driving backwards'
  },
  driveSideways() {
    return 'driving sideways'
  }
}

const augment = function (receivingClass, givingClass) {
  if (arguments[2]) {
    for (let i = 0; i < arguments.length; i++) {
      let method = arguments[i]
      receivingClass.prototype[method] = givingClass.prototype[method]
    }
  } else {
    // provide all methods
    for (let method in givingClass.prototype) {
      // check if prototype has already a method with the same name
      // or check if the method exists in the prototype chain
      if (!Object.hasOwnProperty.call(receivingClass.prototype, method) || !receivingClass.prototype[method]) {
        receivingClass.prototype[method] = givingClass.prototype[method]
      }
    }
  }
}

augment(Car, VehicleMixin, 'driveForward', 'driveBackwards')

module.exports = {
  Person,
  Superhero,
  CarAnimator,
  PersonAnimator,
  Car,
  VehicleMixin,
  augment
}
