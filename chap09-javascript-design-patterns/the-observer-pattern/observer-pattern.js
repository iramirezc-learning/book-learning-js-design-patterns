//- Observer pattern
// ObserverList

// ==================================================
function ObserverList() {
  this.observerList = [];
}

ObserverList.prototype.add = function (obj) {
  return this.observerList.push(obj);
};

ObserverList.prototype.count = function () {
  return this.observerList.length;
};

ObserverList.prototype.get = function (index) {
  if (index >= 0 && index < this.observerList.length) {
    return this.observerList[index];
  }
};

ObserverList.prototype.indexOf = function (obj, startIndex) {
  var i = typeof startIndex === 'number' && startIndex > 0 ? startIndex : 0;

  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      return i;
    }
    i++;
  }

  return -1;
};

ObserverList.prototype.removeAt = function (index) {
  this.observerList.splice(index, 1);
};

// Subject
// ==================================================
function Subject() {
  this.observers = new ObserverList();
}

Subject.prototype.addObserver = function (observer) {
  this.observers.add(observer);
};

Subject.prototype.removeObserver = function (observer) {
  var index;

  if ((index = this.observers.indexOf(observer)) >= 0) {
    this.observers.removeAt(index);
  }
};

Subject.prototype.notify = function (context) {
  var observerCount = this.observers.count();

  for (var i = 0; i < observerCount; i++) {
    this.observers.get(i).update(context);
  }
};

// The Observer
// ==================================================
function Observer() {
  this.update = function () {
    // this function will be overwritten.
  }
}

// test
const testSubject = new Subject();
var anyObject = {};

// extend..
for (var key in testSubject) {
  console.log(key);
  anyObject[key] = testSubject[key];
}

var newObserver = new Observer();

anyObject.addObserver(newObserver);

console.log(anyObject.observers.count()); // 1
console.log(testSubject.observers.count()); // 1

testSubject.removeObserver(newObserver);

console.log(anyObject.observers.count()); // 0
console.log(testSubject.observers.count()); // 0