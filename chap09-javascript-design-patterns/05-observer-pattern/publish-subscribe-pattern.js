/**
 * Implementation of the Publish / Subscribe Pattern
 */

const PubSub = {};

(function (PubSubModule) {
  // storage for topics that can be broadcast
  // or listened to
  var topics = {}

  // a topic identifier
  var subUid = -1

  // publish or broadcast events of interest
  // with a specific topic name and arguments
  // such as the data to pass along
  PubSubModule.publish = function (topic, args) {
    // if topic is not registered, exit
    if (!topics[topic]) {
      return false
    }

    var subscribers = topics[topic]
    var len = subscribers ? subscribers.length : 0

    while (len--) {
      subscribers[len].func(topic, args)
    }

    return this
  }

  // subscribe to events of interest
  // with a specific topic name and a
  // callback function, to be executed
  // when the topic/event is observed
  PubSubModule.subscribe = function (topic, func) {
    // if topic is not registered,
    // creates the new list
    if (!topics[topic]) {
      topics[topic] = []
    }

    // keep track of the subscriber with a token
    var token = (++subUid).toString()

    topics[topic].push({
      token: token,
      func: func
    })

    return token
  }

  // unsubscribe from a specific
  // topic, based on a tokenized reference
  // to the subscription
  PubSubModule.unsubscribe = function (token) {
    for (var m in topics) {
      if (topics[m]) {
        for (var i = 0, len = topics[m].length; i < len; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1)
            return token
          }
        }
      }
    }
    return this
  }
}(PubSub))

module.exports = PubSub
