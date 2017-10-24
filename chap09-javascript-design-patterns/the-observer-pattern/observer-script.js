// Extend an object with an extension
function extend(obj, extension) {
  for (var key in extension) {
    obj[key] = extension[key];
  }
}

// References to DOM elements
var controlCheckbox = document.getElementById('mainCheckbox');
var addBtn = document.getElementById('addNewObserver');
var container = document.getElementById('observersContainer');

// Concrete Subject
// ==================================================

// Extend the controlling checkbox with the Subject class
extend(controlCheckbox, new Subject());

// clicking the checkbox will trigger notifications to its observers
controlCheckbox.onclick = function () {
  controlCheckbox.notify(controlCheckbox.checked);
};

// Concrete Observer
// ==================================================
function addNewObserver() {
  console.log('adding...');
  // Create a new checkbox to be added
  var check = document.createElement('input')
  check.type = 'checkbox';

  // Extend the checkbox with the Observer class
  extend(check, new Observer());

  // Override with custom update behaviour
  check.update = function (value) {
    this.checked = value;
  };

  // Add the new observer to our list of observers
  // for our main subject
  controlCheckbox.addObserver(check);

  // Append the item to the container
  container.appendChild(check);
}

addBtn.onclick = addNewObserver;
