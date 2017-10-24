//- Implementation of the Publish / Subscribe Pattern
var pubsub = {};

(function (myObject) {
  // storage for topics that can be broadcast
  // or listened to
  var topics = {};

  // a topic identifier
  var subUid = -1;

  // publish or broadcast events of interest
  // with a specific topic name and arguments
  // such as the data to pass along
  myObject.publish = function (topic, args) {
    // if topic is not registered, exit
    if (!topics[topic]) {
      return false;
    }

    var subscribers = topics[topic];
    var len = subscribers ? subscribers.length : 0;

    while (len--) {
      subscribers[len].func(topic, args);
    }

    return this;
  };

  // suscribe to events of interest
  // with a specific topic name and a
  // callback function, to be executed
  // when the topic/event is observed
  myObject.subscribe = function (topic, func) {
    // if topic is not registered,
    // creates the new list
    if (!topics[topic]) {
      topics[topic] = [];
    }

    // keep track of the suscriber with a token
    var token = (++subUid).toString();

    topics[topic].push({
      token: token,
      func: func,
    });

    return token;
  };

  // unsubscribe from a specific
  // topic, based on a tokenized reference
  // to the subscription
  myObject.unsubscribe = function (token) {
    for (var m in topics) {
      if (topics[m]) {
        for (var i = 0, len = topics[m].length; i < len; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return this;
  }
}(pubsub));



// Example using our implementation

// a simple message logger that logs any topics and data received through our suscriber
var messageLogger = function (topic, data) {
  console.log('Logging: ' + topic + ': ' + data);
};

// subscribers listen for topics they have subscribed to
// and invoke a callback function once a new notification
// is broadcast on that topic.

var subscription = pubsub.subscribe('inbox/newMessage', messageLogger);

// publishers are in charge of publishing topics or notifications of
// interest to the application

pubsub.publish('inbox/newMessage', 'Hello World!');

pubsub.publish('inbox/newMessage', ['test', 'a', 'b', 'c']);

pubsub.publish('inbox/newMessage', { sender: 'hello@google.com', body: 'Hey again!' });

// we can also unsubscribe if we no longer wish for our subscribers
// to be notified
pubsub.unsubscribe(subscription);

// once unsubscribed, this for example won't result in our
// messageLogger being executed as the subscriber is no longer listening
pubsub.publish('inbox/newMessage', 'Hello! are you still there?');


//- Example: User interface Notifications

// return the current local time to be used in our UI later
function getCurrentTime() {
  var date = new Date();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var y = date.getFullYear();
  var t = date.toLocaleTimeString().toLowerCase();

  return (m + '/' + d + '/' + y + ' ' + t);
}

// add a new row of data to our fictional grid component
function addGridRow(data) {
  // ui.grid.addRow(data);
  console.log('updated grid component with: ' + data);
}

// update our finctional grid to show the time it was last updated
function updateCounter(data) {
  var time = getCurrentTime();
  // ui.grid.updateLastChanged(time);
  console.log('data last updated at: ' + time + " with data: " + data);
}

// update the grid using the data passed to our subscribers
function gridUpdate(topic, data) {
  if (data !== undefined) {
    addGridRow(data);
    updateCounter(data);
  }
}

// create a subscription to the newDataAvailable topic
var subscriber = pubsub.subscribe('newDataAvailable', gridUpdate);

// the following represents updates to our data layer. This could be
// powered by ajax requests which broadcast that new data is available
// to the rest of the application.

// publish changes to the gridUpdated topic representing new entries
pubsub.publish( "newDataAvailable", {
  summary: "Apple made $5 billion",
  identifier: "APPL",
  stockPrice: 570.91
});

pubsub.publish( "newDataAvailable", {
  summary: "Microsoft made $20 million",
  identifier: "MSFT",
  stockPrice: 30.85
});
