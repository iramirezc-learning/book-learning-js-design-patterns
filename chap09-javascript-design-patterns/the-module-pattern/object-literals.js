//- Example of a Module using object literals

var myModule = {
  myProperty: 'someValue',
  myConfig: {
    useCaching: true,
    language: 'en',
  },
  saySomething: function () {
    console.log('Hey! Where is my cheese!');
  },
  reportMyConfig: function () {
    console.log('Caching is: ' + (this.myConfig.useCaching ? 'enabled' : 'disabled'));
  },
  updateMyConfig: function (newConfig) {
    if (typeof newConfig === 'object') {
      this.myConfig = newConfig;
      console.log(this.myConfig.language);
    }
  },
};

myModule.saySomething(); // 'Hey! Where is my cheese!'

myModule.reportMyConfig(); // 'Caching is: enabled'

myModule.updateMyConfig({
  useCaching: false,
  language: 'fr',
}); // 'fr'

myModule.reportMyConfig(); // 'Caching is: disabled'

