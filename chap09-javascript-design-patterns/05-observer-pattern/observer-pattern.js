/**
 * ObserverList Class. Used by Subject to keep track of its observers
 */
function ObserverList () {
  this.observerList = []
}

ObserverList.prototype.add = function (obj) {
  return this.observerList.push(obj)
}

ObserverList.prototype.count = function () {
  return this.observerList.length
}

ObserverList.prototype.get = function (index) {
  if (index >= 0 && index < this.observerList.length) {
    return this.observerList[index]
  }
}

ObserverList.prototype.indexOf = function (obj, startIndex) {
  var i = typeof startIndex === 'number' && startIndex > 0 ? startIndex : 0

  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      return i
    }
    i++
  }

  return -1
}

ObserverList.prototype.removeAt = function (index) {
  this.observerList.splice(index, 1)
}

/**
 * Subject Class.
 */
function Subject () {
  this.observers = new ObserverList()
}

Subject.prototype.addObserver = function (observer) {
  this.observers.add(observer)
}

Subject.prototype.removeObserver = function (observer) {
  var index

  if ((index = this.observers.indexOf(observer)) >= 0) {
    this.observers.removeAt(index)
  }
}

Subject.prototype.notify = function (context) {
  var observerCount = this.observers.count()

  for (var i = 0; i < observerCount; i++) {
    this.observers.get(i).update(context)
  }
}

/**
 * The Observer Class
 */
function Observer () {
  this.update = function () {
    // this function will be overwritten.
  }
}

module.exports = {
  Subject,
  Observer
}
