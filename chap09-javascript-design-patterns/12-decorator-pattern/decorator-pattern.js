/**
 * A simple Vehicle class
 */
function Vehicle (type) {
  this.type = type || 'car'
  this.model = 'default'
  this.serialNumber = 'SN-#####'
}

/**
 * A simple MacBook class
 */
function MacBook() {
  this.cost = () => 40000
  this.screenSize = () => 12
}

/**
 * Decorators for MacBook class
 */
MacBookDecorators = {
  memory(macBook) {
    const $ = macBook.cost()
    macBook.cost = () => $ + 500
  },
  engraving(macBook) {
    const $ = macBook.cost()
    macBook.cost = () => $ + 250
  },
  insurance(macBook) {
    const $ = macBook.cost()
    macBook.cost = () => $ + 300
  }
}

module.exports = {
  Vehicle,
  MacBook,
  MacBookDecorators
}
