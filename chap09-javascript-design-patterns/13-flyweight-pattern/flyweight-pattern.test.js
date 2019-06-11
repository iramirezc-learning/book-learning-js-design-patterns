const assert = require('assert')

const { CoffeeFlavorFactory, CoffeeOrderContext, BookFactory, BookRecordManager } = require('./flyweight-pattern')

describe('Flyweight Pattern - Unit Tests', () => {
  describe('CoffeeFlavorFactory', () => {
    it('should create a CoffeeFlavorFactory and take the orders correctly, creating only 3 flavors', () => {
      const flavors = []
      const tables = []
      let totalOrders = 0
      const flavorFactory = new CoffeeFlavorFactory()
      
      const takeOrder = ({ coffeeFlavor, table }) => {
        flavors.push(flavorFactory.getCoffeeFlavor(coffeeFlavor))
        tables.push(new CoffeeOrderContext(table))
        totalOrders++
      }

      const orders = [
        { coffeeFlavor: 'Cappuccino', table: 2 },
        { coffeeFlavor: 'Cappuccino', table: 2 },
        { coffeeFlavor: 'Frappe', table: 1 },
        { coffeeFlavor: 'Frappe', table: 1 },
        { coffeeFlavor: 'Espresso', table: 1 },
        { coffeeFlavor: 'Frappe', table: 3 },
        { coffeeFlavor: 'Cappuccino', table: 5 },
        { coffeeFlavor: 'Cappuccino', table: 5 },
        { coffeeFlavor: 'Frappe', table: 6 },
        { coffeeFlavor: 'Espresso', table: 4 },
        { coffeeFlavor: 'Cappuccino', table: 7 },
        { coffeeFlavor: 'Espresso', table: 5 },
        { coffeeFlavor: 'Frappe', table: 7 },
        { coffeeFlavor: 'Cappuccino', table: 8 },
        { coffeeFlavor: 'Espresso', table: 9 }
      ]

      for (let i = 0; i < orders.length; i++) {
        takeOrder(orders[i])
      }

      for (let i = 0; i < totalOrders; i++) {
        assert.strictEqual(flavors[i].serveCoffee(tables[i]), `serving coffee flavor '${orders[i].coffeeFlavor}' to table number '${orders[i].table}'`)
      }

      assert.strictEqual(flavorFactory.getTotalCoffeeFlavorsMade(), 3, 'only three flavors should have been created')

      assert.strictEqual(Function.prototype.implementsFor, undefined, `'implementsFor' should be uninstalled`)
    })
  })

  describe('BookFactory', () => {
    it('should create a BookFactory and a BookRecordManager to handle book records', () => {
      const books = [
        { id: 1,
          isbn10: '1-59327-950-7',
          title: 'Eloquent JavaScript',
          edition: '3rd',
          author: 'Marijn Haverbeke',
          pageCount: 450,
          publisher: 'No Starch Press'
        },
        { id: 2,
          isbn10: '1-59327-950-7',
          title: 'Eloquent JavaScript',
          edition: '3rd',
          author: 'Marijn Haverbeke',
          pageCount: 450,
          publisher: 'No Starch Press'
        },
        { id: 3,
          isbn10: '1-59327-950-7',
          title: 'Eloquent JavaScript',
          edition: '3rd',
          author: 'Marijn Haverbeke',
          pageCount: 450,
          publisher: 'No Starch Press'
        },
        { id: 4,
          isbn10: '0-262-01153-0',
          title: 'Structure and Interpretation of Computer Programs',
          edition: '2nd',
          author: 'Harold Abelson;Gerald Jay Sussman',
          pageCount: 657,
          publisher: 'MIT Press'
        },
        { id: 5,
          isbn10: '0-262-01153-0',
          title: 'Structure and Interpretation of Computer Programs',
          edition: '2nd',
          author: 'Harold Abelson;Gerald Jay Sussman',
          pageCount: 657,
          publisher: 'MIT Press'
        },
        { id: 6,
          isbn10: '0-321-57351-X',
          title: 'Algorithms',
          edition: '4th',
          author: 'Robert Sedgewick;Kevin Wayne',
          pageCount: 955,
          publisher: 'Addison Wesley'
        },
        { id: 7,
          isbn10: '0-321-57351-X',
          title: 'Algorithms',
          edition: '4th',
          author: 'Robert Sedgewick;Kevin Wayne',
          pageCount: 955,
          publisher: 'Addison Wesley'
        },
        { id: 8,
          isbn10: '0-9847828-5-7',
          title: 'Cracking the Coding Interview',
          edition: '6th',
          author: 'Gayle Laakmann McDowell',
          pageCount: 696,
          publisher: 'Career Cup'
        },
        { id: 9,
          isbn10: '0-9847828-5-7',
          title: 'Cracking the Coding Interview',
          edition: '6th',
          author: 'Gayle Laakmann McDowell',
          pageCount: 696,
          publisher: 'Career Cup'
        },
        { id: 10,
          isbn10: '0-9973160-0-1',
          title: 'Computer Science Distilled',
          edition: '1st',
          author: 'Wladston Ferreira Fihlo',
          pageCount: 168,
          publisher: 'Code Energy'
        }
      ]

      const DAY_IN_MS = 24 * 60 * 60 * 1000

      const bookFactory = new BookFactory()
      const bookManager = new BookRecordManager(bookFactory)

      // add Book Records
      for (let i = 0; i < books.length; i++) {
        const book = books[i]
        bookManager.addBookRecord(book.id, book, {})
      }

      assert.strictEqual(bookFactory.getTotalBooks(), 5, 'only 5 unique books should be created')

      assert.deepEqual(bookManager.getBookRecord(2), {
        checkoutMember: '',
        checkoutDate: null,
        dueReturnDate: null,
        availability: 'available',
        book: bookFactory.getBook('1-59327-950-7')
      }, 'book record 2 should be initialized with default values')

      const now = new Date()
      const returnDate = new Date(now.getTime() + DAY_IN_MS * 3)

      bookManager.updateCheckoutStatus(2, {
        checkoutMember: 'Isaac',
        checkoutDate: now,
        dueReturnDate: returnDate,
        availability: 'limited'
      })

      assert.deepEqual(bookManager.getBookRecord(2), {
        checkoutMember: 'Isaac',
        checkoutDate: now,
        dueReturnDate: returnDate,
        availability: 'limited',
        book: bookFactory.getBook('1-59327-950-7')
      }, 'book record 2 should be updated')

      assert.deepEqual(bookManager.isPastDue(2), false, 'book record 2 should not be past due')

      bookManager.extendCheckoutPeriod(2, new Date())

      assert.deepEqual(bookManager.isPastDue(2), true, 'book record 2 should be past due')
    })
  })
})
