/**
 * Code copyright Dustin Diaz and Ross Harmes, Pro JavaScript Design Patterns.
 * Ref: https://gist.github.com/addyosmani/1057989
 */
const Interface = function (name, methods) {
  if(arguments.length !== 2) {
    throw new Error(`Interface constructor called with ${arguments.length} arguments, but expected exactly 2.`)
  }

  this.name = name
  this.methods = []

  for (let i = 0; i < methods.length; i++) {
    let methodName = methods[i]
    
    if (typeof methodName !== 'string') {
      throw new TypeError(`Interface constructor expects method names to be type of 'string', but given '${typeof methodName}' at index '${i}'.`)
    }

    this.methods.push(methodName)
  }
}

Interface.ensureImplements = function(obj) {
  if (arguments.length < 2) {
    throw new Error(`Interface.ensureImplements called with '${arguments.length}' arguments, but expected at least 2.`)
  }

  // in a loop validate that interfaces provided are
  for (let i = 1; i < arguments.length; i++) {
    let _interface = arguments[i]

    if (!_interface instanceof Interface || _interface.constructor !== Interface) {
      throw new Error(`Interface.ensureImplements expects argument at index '${i}' to be instance of Interface`)
    }
  
    for (let j = 0; j < _interface.methods.length; j++) {
      let methodName = _interface.methods[j]
      
      if(!obj[methodName] || typeof obj[methodName] !== 'function') {
        throw new TypeError(`Interface.ensureImplements: object does NOT implement the interface: '${_interface.name}'. Method '${methodName}' not found.`)
      }
    }
  }
}

module.exports = {
  Interface
}
