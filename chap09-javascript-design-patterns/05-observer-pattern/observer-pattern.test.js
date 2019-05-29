const assert = require('assert')

const { Subject, Observer } = require('./observer-pattern')
const PubSub = require('./publish-subscribe-pattern')

describe('Observer Pattern - Unit Tests', () => {
  describe('Subject/Observer Pattern', () => {
    it('should create an instance of a Subject', () => {
      const subject = new Subject()
      assert.strictEqual(subject instanceof Subject, true)
      const actualKeys = []
      for (let key in subject) {
        actualKeys.push(key)
      }
      const expectedKeys = ['observers', 'addObserver', 'removeObserver', 'notify']
      assert.strict.deepEqual(actualKeys, expectedKeys)
    })

    it('should create an instance of an Observer', () => {
      const observer = new Observer()
      assert.strictEqual(observer instanceof Observer, true)
      const actualKeys = []
      for (let key in observer) {
        actualKeys.push(key)
      }
      const expectedKeys = ['update']
      assert.strict.deepEqual(actualKeys, expectedKeys)
    })

    it('should add an observer to the subject', () => {
      const subject = new Subject()
      const observer = new Observer()
      assert.strictEqual(subject.observers.count(), 0)
      subject.addObserver(observer)
      assert.strictEqual(subject.observers.count(), 1)
    })

    it('should remove an observer to the subject', () => {
      const subject = new Subject()
      const observer = new Observer()
      const observer2 = new Observer()
      const observer3 = new Observer()

      assert.strictEqual(subject.observers.count(), 0)
      subject.addObserver(observer)
      assert.strictEqual(subject.observers.count(), 1)
      subject.addObserver(observer2)
      assert.strictEqual(subject.observers.count(), 2)
      subject.removeObserver(observer)
      assert.strictEqual(subject.observers.count(), 1)
      subject.removeObserver(observer2)
      assert.strictEqual(subject.observers.count(), 0)
      subject.removeObserver(observer3) // never added
      assert.strictEqual(subject.observers.count(), 0)
    })

    it('should notify its observers and manipulate an object as message', () => {
      const subject = new Subject()
      const observer1 = new Observer()
      const observer2 = new Observer()
      const observer3 = new Observer()

      const message = {
        times2: 3,
        plus2: 3,
        minus2: 3
      }

      observer1.update = (m) => { m.times2 = m.times2 * 2 }
      observer2.update = (m) => { m.plus2 = m.plus2 + 2 }
      observer3.update = (m) => { m.minus2 = m.minus2 - 2 }

      subject.addObserver(observer1)
      subject.addObserver(observer2)
      subject.addObserver(observer3)

      subject.notify(message)

      assert.strict.deepEqual(message, {
        times2: 6,
        plus2: 5,
        minus2: 1
      })
    })
  })

  describe('Publish/Subscribe Pattern', function () {
    it('should subscribe to a topic and log the messages', function () {
      const mockLogger = {
        topic: '',
        args: '',
        log: function (_topic, _args) {
          mockLogger.topic = _topic
          mockLogger.args = _args
        }
      }
      const topic = 'food'
      const msg1 = 'apple'
      const msg2 = ['orange', 'lemon', 'pineapple']
      const msg3 = { fruit: 3, veggies: 4 }

      const subscription = PubSub.subscribe(topic, mockLogger.log)

      assert.strictEqual(typeof subscription, 'string')

      PubSub.publish(topic, msg1)
      assert.strict.equal(mockLogger.topic, topic)
      assert.strict.deepEqual(mockLogger.args, msg1)

      PubSub.publish(topic, msg2)
      assert.strict.equal(mockLogger.topic, topic)
      assert.strict.deepEqual(mockLogger.args, msg2)

      PubSub.publish(topic, msg3)
      assert.strict.equal(mockLogger.topic, topic)
      assert.strict.deepEqual(mockLogger.args, msg3)
    })

    it('should unsubscribe to a topic an stop logging the messages', () => {
      const mockLogger = {
        topic: '',
        args: '',
        log: function (_topic, _args) {
          mockLogger.topic = _topic
          mockLogger.args = _args
        }
      }
      const topic = 'animals'
      const msg1 = 'tiger'
      const msg2 = 'shark'

      const subscription = PubSub.subscribe(topic, mockLogger.log)

      PubSub.publish(topic, msg1)
      assert.strict.equal(mockLogger.topic, topic)
      assert.strict.equal(mockLogger.args, msg1)

      PubSub.unsubscribe(subscription)

      // clean logger
      mockLogger.topic = null
      mockLogger.args = null

      PubSub.publish(topic, msg2)
      assert.strict.equal(mockLogger.topic, null)
      assert.strict.equal(mockLogger.args, null)
    })
  })
})
