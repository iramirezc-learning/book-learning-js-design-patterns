/**
 * Example of a Module using object literals
 */
var myModule = {
  myProperty: 'someValue',
  myConfig: {
    useCaching: true,
    language: 'en'
  },
  saySomething: function () {
    return 'Hey! Where is my cheese!'
  },
  reportMyConfig: function () {
    return 'Caching is: ' + (this.myConfig.useCaching ? 'enabled' : 'disabled')
  },
  updateMyConfig: function (newConfig) {
    if (typeof newConfig === 'object') {
      this.myConfig = newConfig
    }
    return this.myConfig.language
  }
}

module.exports = myModule
