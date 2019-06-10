const { Interface } = require('./Interface')

const PRICES = {
  'MAC_BOOK_PRO': 9000,
  'CASE': 1000,
}

/**
 * An interface to validate
 * that MacBook classes
 * implement these methods
 */
const MacBookInterface = new Interface('MacBook', [
  'addEngraving',
  'addParallels',
  'addRamMemory',
  'addCase',
  'getPrice'
])

/**
 * Abstract MacBookDecorator Class
 */
const MacBookDecorator = function (macBook) {
  Interface.ensureImplements(macBook, MacBookInterface)
  this.macBook = macBook
}

MacBookDecorator.prototype.addEngraving = function () {
  return this.macBook.addEngraving()
}

MacBookDecorator.prototype.addParallels = function () {
  return this.macBook.addParallels()
}

MacBookDecorator.prototype.addRamMemory = function () {
  return this.macBook.addRamMemory()
}

MacBookDecorator.prototype.addCase = function () {
  return this.macBook.addCase()
}

MacBookDecorator.prototype.getPrice = function () {
  return this.macBook.getPrice()
}

// ==================================================

/**
 * MacBookPro class that implements MacBookInterface
 */
const MacBookPro = function (props = {}) {
  this.type = props.type || 'mac_book_pro'
}

MacBookPro.prototype.addEngraving = function () {
  return 'adding engraving'
}

MacBookPro.prototype.addParallels = function () {
  return 'adding parallels'
}

MacBookPro.prototype.addRamMemory = function () {
  return 'adding ram memory'
}

MacBookPro.prototype.addCase = function () {
  return 'adding case'
}

MacBookPro.prototype.getPrice = function () {
  return PRICES['MAC_BOOK_PRO']
}

module.exports = {
  MacBookDecorator,
  MacBookPro,
  PRICES
}