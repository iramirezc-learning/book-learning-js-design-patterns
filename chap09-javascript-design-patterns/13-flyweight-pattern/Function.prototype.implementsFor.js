const implementsFor = (function() {
  const original = Function.prototype.implementsFor

  function _uninstall () {
    Function.prototype.implementsFor = original
  }

  function _install() {
    Function.prototype.implementsFor = function (ParentClassOrObject) {
      if (ParentClassOrObject.constructor === Function) {
        // normal inheritance
        this.prototype = new ParentClassOrObject()
        this.prototype.constructor = this
        this.prototype.parent = ParentClassOrObject.prototype
      } else {
        // virtual inheritance
        this.prototype = ParentClassOrObject
        this.prototype.constructor = this
        this.prototype.parent = ParentClassOrObject
      }
      
      return this
    }
  }

  return {
    install: () => _install(),
    uninstall: () => _uninstall()
  }
}())

module.exports = implementsFor