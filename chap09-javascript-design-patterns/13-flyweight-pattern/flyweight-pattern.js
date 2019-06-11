const _implementsFor = require('./Function.prototype.implementsFor')

/**
 * CoffeeOrder: Flyweight (interface)
 */
const CoffeeOrder = {
  getFlavor() {

  },
  serveCoffee(context) {

  }
}

/**
 * CoffeeFlavor: Concrete Flyweight
 * Implements CoffeeOrder
 */
const CoffeeFlavor = function (flavorName) {
  const flavor = flavorName

  if (typeof this.getFlavor === 'function') {
    this.getFlavor = function () {
      return flavor
    }
  }

  if (typeof this.serveCoffee === 'function') {
    this.serveCoffee = function (context) {
      return `serving coffee flavor '${flavor}' to table number '${context.getTable()}'`
    }
  }
}

_implementsFor.install()
CoffeeFlavor.implementsFor(CoffeeOrder)
_implementsFor.uninstall()

/**
 * CoffeeOrderContext: Helper
 */
const CoffeeOrderContext = function(tableNumber) {
  return {
    getTable() {
      return tableNumber
    }
  }
}

/**
 * CoffeeFlavorFactory: Flyweight Factory
 */
const CoffeeFlavorFactory = function () {
  const flavors = {}
  let length = 0

  function _getCoffeeFlavor (flavorName) {
    if (typeof flavors[flavorName] === 'undefined') {
      const flavor = new CoffeeFlavor(flavorName)
      flavors[flavorName] = flavor
      length++
    }

    return flavors[flavorName]
  }

  function _getTotalCoffeeFlavorsMade() {
    return length
  }

  return {
    getCoffeeFlavor (flavorName) {
      return _getCoffeeFlavor(flavorName)
    },
    getTotalCoffeeFlavorsMade() {
      return _getTotalCoffeeFlavorsMade()
    }
  }
}

const Book = function (props = {}) {
  this.isbn10 = props.isbn10 || ''
  this.title = props.title || ''
  this.edition = props.edition || ''
  this.author = props.author || ''
  this.pageCount = props.pageCount || 0
  this.publisher = props.publisher || ''
}

const BookFactory = function() {
  const books = {}
  let bookCount = 0

  function _createBook(props = {}) {
    const { isbn10 } = props

    if (typeof books[isbn10] === 'undefined') {
      const book = new Book(props)
      books[isbn10] = book
      bookCount++
    }

    return books[isbn10]
  }

  function _getBook(isbn10) {
    return books[isbn10]
  }

  return {
    createBook (props) {
      return _createBook(props)
    },
    getBook(isbn10) {
      return _getBook(isbn10)
    },
    getTotalBooks () {
      return bookCount
    }
  }
}

const BookRecordManager = function(bookFactory) {
  const bookRecordDB = {}

  function _addBookRecord(bookId, bookProps = {}, recordProps = {}) {
    const book = bookFactory.createBook(bookProps)

    bookRecordDB[bookId] = {
      checkoutMember: recordProps.checkoutMember || '',
      checkoutDate: recordProps.checkoutDate || null,
      dueReturnDate: recordProps.dueReturnDate || null,
      availability: recordProps.availability || 'available',
      book
    }
  }

  function _updateCheckoutStatus (bookId, recordProps = {}) {
    const record = bookRecordDB[bookId]

    record.checkoutMember = recordProps.checkoutMember
    record.checkoutDate = recordProps.checkoutDate
    record.dueReturnDate = recordProps.dueReturnDate
    record.availability = recordProps.availability
  }

  function _extendCheckoutPeriod(bookId, newReturnDate) {
    bookRecordDB[bookId].dueReturnDate = newReturnDate
  }

  function _isPastDue(bookId) {
    const currentDate = new Date()
    return currentDate.getTime() > Date.parse(bookRecordDB[bookId].dueReturnDate)
  }

  function _getBookRecord(bookId) {
    return bookRecordDB[bookId]
  }

  return {
    addBookRecord(bookId, bookProps, recordProps) {
      _addBookRecord(bookId, bookProps, recordProps)
    },
    updateCheckoutStatus(bookId, recordProps) {
      _updateCheckoutStatus(bookId, recordProps)
    },
    extendCheckoutPeriod(bookId, newReturnDate) {
      _extendCheckoutPeriod(bookId, newReturnDate)
    },
    isPastDue(bookId) {
      return _isPastDue(bookId)
    },
    getBookRecord(bookId) {
      return _getBookRecord(bookId)
    }
  }
}

module.exports = {
  CoffeeFlavorFactory,
  CoffeeOrderContext,
  BookFactory,
  BookRecordManager
}